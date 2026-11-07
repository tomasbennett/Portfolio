import { useRef, useState } from "react"
import { IMediumProjAnimationComponents } from "../models/IProjAnimationState";
import { IProjVisualAnimationHookReturn } from "../models/IProjVisualAnimationHookReturn";
import { IElementEventTypes } from "../models/IElementEventTypes";
import { useError } from "../../error/contexts/ErrorContext";
import { useNavigate } from "react-router-dom";
import { ICustomErrorResponse } from "../../../../../shared/features/api/models/APIErrorResponse";
import { errorPageRoute } from "../../../constants/routes";


type IUseMediumScreenImgDisplay = {
    isDynamicAnimationPossible: boolean;
    contentImgContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function useMediumScreenImgDisplay({
    isDynamicAnimationPossible,
    contentImgContainerRef: leftContentContainer
}: IUseMediumScreenImgDisplay): IProjVisualAnimationHookReturn & {
    // leftContentContainer: React.RefObject<HTMLDivElement | null>;
    rightHomePageImgContainer: React.RefObject<HTMLDivElement | null>;
    componentAnimationStates: IMediumProjAnimationComponents;
} {

    // const leftContentContainer = useRef<HTMLDivElement | null>(null);
    const rightHomePageImgContainer = useRef<HTMLDivElement | null>(null);

    const isAnimationLeaving = useRef<boolean>(false);



    const [componentAnimationStates, setComponentAnimationStates] = useState<IMediumProjAnimationComponents>({
        contentContainer: "left",
        homePageImgContainer: "left"
    });

    const errCtx = useError();
    const nav = useNavigate();


    const checkRefsExist = (): boolean => {
        const leftRef = leftContentContainer.current;
        const rightRef = rightHomePageImgContainer.current;

        if (!leftRef || !rightRef) {
            const noElementError: ICustomErrorResponse = {
                ok: false,
                status: 500,
                message: "One or more elements not found.",
            }

            errCtx.throwError(noElementError);
            nav(errorPageRoute, {
                state: {
                    error: noElementError
                }
            });

            return false;
        }

        return true;

    }

    const whichContainer = (e: IElementEventTypes): "left" | "right" | null => {
        if (!checkRefsExist()) {
            return null;
        }

        const leftRef = leftContentContainer.current!;
        const rightRef = rightHomePageImgContainer.current!;

        if (e.currentTarget === leftRef) {
            return "left";

        } else if (e.currentTarget === rightRef) {
            return "right";

        } else {
            return null;
        }
    }


    const finishLeftContainerAnimation = () => {
        setComponentAnimationStates({
            contentContainer: "displayed",
            homePageImgContainer: "left"
        });
    }

    const finishRightContainerAnimation = () => {
        setComponentAnimationStates({
            contentContainer: "left",
            homePageImgContainer: "displayed"
        });
    }

    const finishLeavingLeftContainerAnimation = () => {
        console.log("The finishLeavingLeftContainerAnimation function was called!!!");

        setComponentAnimationStates(prev => ({
            ...prev,
            contentContainer: "left"
        }));

        isAnimationLeaving.current = false;
    }

    const finishLeavingRightContainerAnimation = () => {
        setComponentAnimationStates(prev => ({
            ...prev,
            homePageImgContainer: "left"
        }));

        isAnimationLeaving.current = false;
    }



    const handleActivate = (e: IElementEventTypes) => {

        console.log("handleActivate called", e.target, e.currentTarget, e.type);
        e.stopPropagation();
        console.log("is animation leaving", isAnimationLeaving.current);

        if (
            !isDynamicAnimationPossible || 
            isAnimationLeaving.current
        ) return;

        const container = whichContainer(e);

        if (!container) {
            return;
        }
        
        console.log("handleActivate container", container);


        const rightRef = rightHomePageImgContainer.current!;
        const leftRef = leftContentContainer.current!;


        if (container === "left") {

            if (
                componentAnimationStates.contentContainer === "displayed" ||
                componentAnimationStates.contentContainer === "displaying"
            ) return;


            rightRef.removeEventListener("animationend", finishRightContainerAnimation);
            rightRef.removeEventListener("animationend", finishLeavingRightContainerAnimation);

            setComponentAnimationStates({
                homePageImgContainer: "left",
                contentContainer: "displaying"
            });

            leftRef.addEventListener("animationend", finishLeftContainerAnimation, { once: true });

            return;

        }

        if (
            componentAnimationStates.homePageImgContainer === "displayed" ||
            componentAnimationStates.homePageImgContainer === "displaying"
        ) return;

        leftRef.removeEventListener("animationend", finishLeavingLeftContainerAnimation);
        leftRef.removeEventListener("animationend", finishLeftContainerAnimation);


        setComponentAnimationStates({
            contentContainer: "left",
            homePageImgContainer: "displaying"
        });

        rightRef.addEventListener("animationend", finishRightContainerAnimation, { once: true });


        return;

    }

    const handleDeactivate = (e: IElementEventTypes) => {
        e.stopPropagation();

        console.log("handle deactivate running: ");

        if (!isDynamicAnimationPossible) return;

        const container = whichContainer(e);

        if (!container) {
            return;
        }

        console.log("Container gathered functionality running: ", container);

        const rightRef = rightHomePageImgContainer.current!;
        const leftRef = leftContentContainer.current!;

        
        if (container === "left") {
            
            if (
                componentAnimationStates.contentContainer === "left" || 
                componentAnimationStates.contentContainer === "leaving"
            ) return;

            isAnimationLeaving.current = true;
            
            rightRef.removeEventListener("animationend", finishLeavingRightContainerAnimation);
            rightRef.removeEventListener("animationend", finishRightContainerAnimation);

            setComponentAnimationStates(prev => ({
                ...prev,
                contentContainer: "leaving"
            }));


            leftRef.addEventListener("animationend", finishLeavingLeftContainerAnimation, { once: true });

            return;

        }

        if (
            componentAnimationStates.homePageImgContainer === "left" || 
            componentAnimationStates.homePageImgContainer === "leaving"
        ) return;

        isAnimationLeaving.current = true;

        leftRef.removeEventListener("animationend", finishLeavingLeftContainerAnimation);
        leftRef.removeEventListener("animationend", finishLeftContainerAnimation);

        setComponentAnimationStates(prev => ({
            ...prev,
            homePageImgContainer: "leaving"
        }));

        rightRef.addEventListener("animationend", finishLeavingRightContainerAnimation, { once: true });

        return;


    }

    const togglePlayState = (e: IElementEventTypes) => {
        e.stopPropagation();

        if (!isDynamicAnimationPossible) return;

        const container = whichContainer(e);

        if (!container) {
            return;
        }


        const { contentContainer, homePageImgContainer } = componentAnimationStates;

        if (
            contentContainer === "displaying" || 
            contentContainer === "leaving" || 
            homePageImgContainer === "displaying" || 
            homePageImgContainer === "leaving"
        ) {
            return;
        }

        if (container === "left") {
            if (contentContainer === "displayed") {
                handleDeactivate(e);
            } else {
                handleActivate(e);
            }

            return;
        }

        if (container === "right") {
            if (homePageImgContainer === "displayed") {
                handleDeactivate(e);
            } else {
                handleActivate(e);
            }

            return;
        }

        
    }





    return {
        rightHomePageImgContainer,
        handleActivate,
        handleDeactivate,
        togglePlayState,
        componentAnimationStates
    }
}