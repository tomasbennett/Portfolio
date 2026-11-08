import { useEffect, useRef, useState } from "react";
import { IProjVisualAnimationHookReturn } from "../models/IProjVisualAnimationHookReturn";
import { IWideProjAnimationComponents, IWideProjReferenceTypes, IWideProjTypes } from "../models/IProjAnimationState";
import { useError } from "../../error/contexts/ErrorContext";
import { useNavigate } from "react-router-dom";
import { ICustomErrorResponse } from "../../../../../shared/features/api/models/APIErrorResponse";
import { errorPageRoute } from "../../../constants/routes";
import { IElementEventTypes } from "../models/IElementEventTypes";
import { IProjAnimEndActions, IProjAnimEndStates } from "../models/IProjAnimEndStates";



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

    const isAnimating = useRef<boolean>(false);

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



    const numElemsDisappearRef = useRef<number>(0);
    const activeElemKeyRef = useRef<keyof IWideProjAnimationComponents | undefined>(undefined);

    const onAppearingAnimEnd = (componentKey: keyof IWideProjAnimationComponents) => {
        numElemsDisappearRef.current -= 1;
        console.log("appearing has ended whilst the num elements is:::", numElemsDisappearRef.current);



        setComponentAnimationStates(prev => {

            const newVal: IWideProjReferenceTypes = {
                ...prev[componentKey],
                animState: "appeared"
            }

            return {
                ...prev,
                [componentKey]: newVal
            }

        });

        if (numElemsDisappearRef.current > 0) return;

        isAnimating.current = false;

    }

    const onLeavingAnimEnd = (componentKey: keyof IWideProjAnimationComponents) => {
        console.log("leaving has ended anim:::");
        
        setComponentAnimationStates(prev => {
            const updated = { ...prev };

            const keys = Object.keys(updated) as Array<
                keyof IWideProjAnimationComponents
            >;

            keys.forEach(key => {
                if (key !== componentKey) {
                    updated[key] = {
                        ...updated[key],
                        animState: "appearing"
                    };
                } else {
                    updated[key] = {
                        ...updated[key],
                        animState: "appeared"
                    }
                }
            });

            return updated;
        });
    }

    const onDisappearingAnimEnd = (componentKey: keyof IWideProjAnimationComponents) => {
        numElemsDisappearRef.current += 1;

        console.log("disappearing has ended and numeELements is:::", numElemsDisappearRef.current);

        //disappeared
        setComponentAnimationStates(prev => {
            const newVal: IWideProjReferenceTypes = {
                ...prev[componentKey],
                animState: "disappeared"
            }

            return {
                ...prev,
                [componentKey]: newVal
            }

        });

        if (numElemsDisappearRef.current < 2) return;


        const activeElemKey = activeElemKeyRef.current;
        if (!activeElemKey) return;

        //displaying
        setComponentAnimationStates(prev => {
            const newVal: IWideProjReferenceTypes = {
                ...prev[activeElemKey],
                animState: "displaying"
            }

            return {
                ...prev,
                [activeElemKey]: newVal
            }

        });



    }

    const onDisplayingAnimEnd = (componentKey: keyof IWideProjAnimationComponents) => {
        console.log("displaying has ended here so...");
        
        setComponentAnimationStates(prev => {
            const newVal: IWideProjReferenceTypes = {
                ...prev[componentKey],
                animState: "displayed"
            }

            return {
                ...prev,
                [componentKey]: newVal
            }
        });

        isAnimating.current = false;

    }







    const animationEndActions: IProjAnimEndActions = {
        leaving: onLeavingAnimEnd,
        appearing: onAppearingAnimEnd,
        disappearing: onDisappearingAnimEnd,
        displaying: onDisplayingAnimEnd
    }






    function isProjAnimEndState(
        state: IWideProjTypes
    ): state is IProjAnimEndStates {
        return state in animationEndActions;
    }

    useEffect(() => {
        const listeners: {
            element: HTMLDivElement;
            handler: (e: AnimationEvent) => void;
        }[] = [];

        const keys = Object.keys(componentAnimationStates) as Array<
            keyof IWideProjAnimationComponents
        >;

        keys.forEach(key => {
            const entry = componentAnimationStates[key];
            const animState = entry.animState;
            const element = entry.component.current;
            if (!element) return;

            if (!isProjAnimEndState(animState)) return;

            const handler = (e: AnimationEvent) => {
                if (e.target !== element) return;

                animationEndActions[animState](key);
            };

            element.addEventListener("animationend", handler);

            listeners.push({ element, handler });
        });

        return () => {
            listeners.forEach(({ element, handler }) => {
                element.removeEventListener("animationend", handler);
            });
        };
    }, [componentAnimationStates]);



    useEffect(() => {
        
        
        return () => {
            setComponentAnimationStates(prev => {
    
    
                return {
                    contentContainer: {
                        ...prev.contentContainer,
                        animState: "appeared"
                    },
                    homePageImgContainer: {
                        ...prev.homePageImgContainer,
                        animState: "appeared"
                    },
                    githubImgContainer: {
                        ...prev.githubImgContainer,
                        animState: "appeared"
                    }
                }
            });

            isAnimating.current = false;
            numElemsDisappearRef.current = 0;
        }
    }, [isAnimatingPossible]);







    function handleActivate(e: IElementEventTypes) {
        // No-op for wide screens

        console.log("Handle activate running!!!");
        if (!isAnimatingPossible || isAnimating.current) return;
        e.stopPropagation();
        console.log("Anim under activate was possible!!!");

        const container = whichContainer(e);

        if (!container) return;

        if (componentAnimationStates[container].animState === "displayed") return;

        console.log("CONTAINER under activate was possible: !!!", container);

        activeElemKeyRef.current = container;

        isAnimating.current = true;

        setComponentAnimationStates(prev => {


            return {
                ...prev,
                ...Object.fromEntries(
                    Object.entries(componentAnimationStates).map(([key, val]) => {
                        
                        const newVal: IWideProjReferenceTypes = key === container ? val : { ...val, animState: "disappearing" };



                        return [key, newVal]
                    })
                )
            }
        });

        return;




    }

    function handleDeactivate(e: IElementEventTypes) {

        console.log("handle deactivate running!!!");
        // No-op for wide screens
        if (!isAnimatingPossible || isAnimating.current) return;



        e.stopPropagation();

        console.log("HANDLE deactivate anim was possible!!!");


        const container = whichContainer(e);

        if (!container) return;

        console.log("HANDLE deactivate container was found:::", container);

        if (componentAnimationStates[container].animState === "appeared") return;


        const componentRef = componentAnimationStates[container].component;

        const newVal: IWideProjReferenceTypes = {
            animState: "leaving",
            component: componentRef
        };

        setComponentAnimationStates((prev) => ({
            ...prev,
            [container]: newVal
        }));

        activeElemKeyRef.current = undefined;
        isAnimating.current = true;

        return;





    }



    function togglePlayState(e: IElementEventTypes) {
        // No-op for wide screens
        console.log("TOGGLE running !!!");

        if (!isAnimatingPossible || isAnimating.current) return;
        e.stopPropagation();

        console.log("toggle anim was possible!!!");


        const container = whichContainer(e);

        if (!container) return;

        console.log("TOGGLE CONTAINER WAS FOUND:::", container);

        if (componentAnimationStates[container].animState === "appeared") {
            console.log("toggle into activate!!!");
            handleActivate(e);
            return;
        }

        if (componentAnimationStates[container].animState === "displayed") {
            console.log("toggle into deactivate!!!");
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