import { useEffect, useRef, useState } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import { ICustomErrorResponse } from "../../../../../shared/features/api/models/APIErrorResponse";
import { useNavigate } from "react-router-dom";
import { errorPageRoute } from "../../../constants/routes";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";
import { IProjAnimationState } from "../models/IProjAnimationState";
import { IProjVisualAnimationHookReturn } from "../models/IProjVisualAnimationHookReturn";
import { IElementEventTypes } from "../models/ElementEventTypes";



type IUseThinScreenImgVideoPlayer = {
    isVideoAvailable: boolean;
    imgVideoPlayerContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function useThinScreenImgVideoPlayer({
    isVideoAvailable,
    imgVideoPlayerContainerRef
}: IUseThinScreenImgVideoPlayer): IProjVisualAnimationHookReturn & {
    // imgVideoPlayerContainerRef: React.RefObject<HTMLDivElement | null>;
    videoRef: React.RefObject<HTMLDivElement | null>;
    currDisplay: IProjAnimationState;
} {

    // const imgVideoPlayerContainerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLDivElement | null>(null);


    const [currDisplay, setCurrDisplay] = useState<IProjAnimationState>("left");

    const errCtx = useError();
    const nav = useNavigate();

    useEffect(() => {

        if (!isVideoAvailable || currDisplay === "left" || currDisplay === "displayed") {
            return;
        }



        const videoElement = videoRef.current;
        if (!videoElement) {
            const noVideoElementError: ICustomErrorResponse = {
                ok: false,
                status: 500,
                message: "Video element not found.",
            }

            errCtx.throwError(noVideoElementError);
            nav(errorPageRoute, {
                state: {
                    error: noVideoElementError
                }
            });
            return;
        }

        const handleVideoAddedToDOM = () => {
            setCurrDisplay("displayed");
        }

        const handleRemoveVideoFromDOM = () => {
            setCurrDisplay("left");
        }

        if (currDisplay === "displaying") {
            videoElement.addEventListener("animationend", handleVideoAddedToDOM);

        } else {
            videoElement.addEventListener("animationend", handleRemoveVideoFromDOM);

        }


        return () => {
            videoElement.removeEventListener("animationend", handleVideoAddedToDOM);
            videoElement.removeEventListener("animationend", handleRemoveVideoFromDOM);
        }

    }, [currDisplay, isVideoAvailable]);

    const handleActivate = (e: IElementEventTypes) => {
        if (!isVideoAvailable || currDisplay === "displayed") return;

        setCurrDisplay("displaying");
    }

    const handleDeactivate = (e: IElementEventTypes) => {
        if (!isVideoAvailable || currDisplay === "left") return;

        setCurrDisplay("leaving");
    }

    const togglePlayState = (e: IElementEventTypes) => {
        if (!isVideoAvailable) return;

        setCurrDisplay((prev) => {
            return (prev === "displaying" || prev === "displayed") ? 
                "leaving" : 
                "displaying"
        });
    }




    return {
        // imgVideoPlayerContainerRef,
        // imgRef,
        videoRef,
        handleActivate,
        handleDeactivate,
        togglePlayState,
        // isVideoPlaying,
        currDisplay
    }
}