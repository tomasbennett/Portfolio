import { useRef, useState } from "react"
import { IMediumProjAnimationComponents } from "../models/IProjAnimationState";
import { IProjVisualAnimationHookReturn } from "../models/IProjVisualAnimationHookReturn";
import { IElementEventTypes } from "../models/ElementEventTypes";
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
    leftContentContainer: React.RefObject<HTMLDivElement | null>;
    rightHomePageImgContainer: React.RefObject<HTMLDivElement | null>;
    componentAnimationStates: IMediumProjAnimationComponents;
} {

    // const leftContentContainer = useRef<HTMLDivElement | null>(null);
    const rightHomePageImgContainer = useRef<HTMLDivElement | null>(null);

    const isAnimationLeaving = useRef<boolean>(false);



    const [componentAnimationStates, setComponentAnimationStates] = useState<IMediumProjAnimationComponents>({
        leftContainer: "left",
        rightContainer: "left"
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
            leftContainer: "displayed",
            rightContainer: "left"
        });
    }

    const finishRightContainerAnimation = () => {
        setComponentAnimationStates({
            leftContainer: "left",
            rightContainer: "displayed"
        });
    }

    const finishLeavingLeftContainerAnimation = () => {
        console.log("The finishLeavingLeftContainerAnimation function was called!!!");

        setComponentAnimationStates(prev => ({
            ...prev,
            leftContainer: "left"
        }));

        isAnimationLeaving.current = false;
    }

    const finishLeavingRightContainerAnimation = () => {
        setComponentAnimationStates(prev => ({
            ...prev,
            rightContainer: "left"
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
                componentAnimationStates.leftContainer === "displayed" ||
                componentAnimationStates.leftContainer === "displaying"
            ) return;


            rightRef.removeEventListener("animationend", finishRightContainerAnimation);
            rightRef.removeEventListener("animationend", finishLeavingRightContainerAnimation);

            setComponentAnimationStates({
                rightContainer: "left",
                leftContainer: "displaying"
            });

            leftRef.addEventListener("animationend", finishLeftContainerAnimation, { once: true });

            return;

        }

        if (
            componentAnimationStates.rightContainer === "displayed" ||
            componentAnimationStates.rightContainer === "displaying"
        ) return;

        leftRef.removeEventListener("animationend", finishLeavingLeftContainerAnimation);
        leftRef.removeEventListener("animationend", finishLeftContainerAnimation);


        setComponentAnimationStates({
            leftContainer: "left",
            rightContainer: "displaying"
        });

        rightRef.addEventListener("animationend", finishRightContainerAnimation, { once: true });


        return;

    }

    const handleDeactivate = (e: IElementEventTypes) => {
        e.stopPropagation();

        if (!isDynamicAnimationPossible) return;

        const container = whichContainer(e);

        if (!container) {
            return;
        }

        const rightRef = rightHomePageImgContainer.current!;
        const leftRef = leftContentContainer.current!;

        
        if (container === "left") {
            
            if (
                componentAnimationStates.leftContainer === "left" || 
                componentAnimationStates.leftContainer === "leaving"
            ) return;

            isAnimationLeaving.current = true;
            
            rightRef.removeEventListener("animationend", finishLeavingRightContainerAnimation);
            rightRef.removeEventListener("animationend", finishRightContainerAnimation);

            setComponentAnimationStates(prev => ({
                ...prev,
                leftContainer: "leaving"
            }));


            leftRef.addEventListener("animationend", finishLeavingLeftContainerAnimation, { once: true });

            return;

        }

        if (
            componentAnimationStates.rightContainer === "left" || 
            componentAnimationStates.rightContainer === "leaving"
        ) return;

        isAnimationLeaving.current = true;

        leftRef.removeEventListener("animationend", finishLeavingLeftContainerAnimation);
        leftRef.removeEventListener("animationend", finishLeftContainerAnimation);

        setComponentAnimationStates(prev => ({
            ...prev,
            rightContainer: "leaving"
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


        const { leftContainer, rightContainer } = componentAnimationStates;

        if (
            leftContainer === "displaying" || 
            leftContainer === "leaving" || 
            rightContainer === "displaying" || 
            rightContainer === "leaving"
        ) {
            return;
        }

        if (container === "left") {
            if (leftContainer === "displayed") {
                handleDeactivate(e);
            } else {
                handleActivate(e);
            }

            return;
        }

        if (container === "right") {
            if (rightContainer === "displayed") {
                handleDeactivate(e);
            } else {
                handleActivate(e);
            }

            return;
        }

        
    }





    return {
        leftContentContainer,
        rightHomePageImgContainer,
        handleActivate,
        handleDeactivate,
        togglePlayState,
        componentAnimationStates
    }
}