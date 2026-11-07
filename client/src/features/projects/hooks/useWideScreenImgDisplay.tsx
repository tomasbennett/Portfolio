import { useRef, useState } from "react";
import { IProjVisualAnimationHookReturn } from "../models/IProjVisualAnimationHookReturn";
import { IWideProjAnimationComponents, IWideProjReferenceTypes, IWideProjTypes } from "../models/IProjAnimationState";
import { useError } from "../../error/contexts/ErrorContext";
import { useNavigate } from "react-router-dom";
import { ICustomErrorResponse } from "../../../../../shared/features/api/models/APIErrorResponse";
import { errorPageRoute } from "../../../constants/routes";
import { IElementEventTypes } from "../models/IElementEventTypes";



type IUseWideScreenImgDisplay = {
    isAnimatingPossible: boolean;
    contentImgContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function useWideScreenImgDisplay({
    contentImgContainerRef,
    isAnimatingPossible
}: IUseWideScreenImgDisplay): IProjVisualAnimationHookReturn & {
    githubImgContainerRef: React.RefObject<HTMLDivElement | null>;
    homePageImgContainerRef: React.RefObject<HTMLDivElement | null>;
    componentAnimationStates: IWideProjAnimationComponents;
} {


    const githubImgContainerRef = useRef<HTMLDivElement | null>(null);
    const homePageImgContainerRef = useRef<HTMLDivElement | null>(null);


    //APPEARED IS NORMAL DEFAULT STATE WHEREAS DISPLAYED IS WHEN IT IS FULL SCREEN
    const [componentAnimationStates, setComponentAnimationStates] = useState<IWideProjAnimationComponents>({
        contentContainer: {
            animState: "appeared",
            component: contentImgContainerRef
        },
        homePageImgContainer: {
            animState: "appeared",
            component: homePageImgContainerRef
        },
        githubImgContainer: {
            animState: "appeared",
            component: githubImgContainerRef
        }
    });

    


    
    const errCtx = useError();
    const nav = useNavigate();



    const checkRefsExist = (): boolean => {
        const homePageImgContainer = homePageImgContainerRef.current;
        const contentImgContainer = contentImgContainerRef.current;
        const githubImgContainer = githubImgContainerRef.current;

        if (!homePageImgContainer || !contentImgContainer || !githubImgContainer) {
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

    const whichContainer = (e: IElementEventTypes): keyof IWideProjAnimationComponents | null => {
        if (!checkRefsExist()) {
            return null;
        }

        const home = homePageImgContainerRef.current!;
        const content = contentImgContainerRef.current!;
        const github = githubImgContainerRef.current!;

        if (e.currentTarget === home) {
            return "homePageImgContainer";

        } else if (e.currentTarget === content) {
            return "contentContainer";

        } else if (e.currentTarget === github) {
            return "githubImgContainer";

        } else {
            return null;
    
        }
    }





    function handleActivate(e: IElementEventTypes) {
        // No-op for wide screens
        e.stopPropagation();

        if (!isAnimatingPossible) return;

        const container = whichContainer(e);

        if (!container) return;






    }

    function handleDeactivate(e: IElementEventTypes) {
        // No-op for wide screens
        e.stopPropagation();

        if (!isAnimatingPossible) return;

        const container = whichContainer(e);

        if (!container) return;

        if (componentAnimationStates[container].animState === "displayed") {

            const newVal: IWideProjReferenceTypes = {
                animState: "leaving",
                component: componentAnimationStates[container].component
            };

            setComponentAnimationStates((prev): IWideProjAnimationComponents => ({
                ...prev,
                [container]: newVal
            }));

            return;
        }



    }



    function togglePlayState(e: IElementEventTypes) {
        // No-op for wide screens
        e.stopPropagation();

        if (!isAnimatingPossible) return;

        const container = whichContainer(e);

        if (!container) return;

        if (componentAnimationStates[container].animState === "appeared") {
            handleActivate(e);
            return;
        }

        if (componentAnimationStates[container].animState === "displayed") {
            handleDeactivate(e);
            return;
        }

    }

    return {
        handleActivate,
        handleDeactivate,
        togglePlayState,
        githubImgContainerRef,
        homePageImgContainerRef,
        componentAnimationStates
    };

}