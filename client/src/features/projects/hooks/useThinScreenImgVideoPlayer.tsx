import { useEffect, useRef, useState } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import { ICustomErrorResponse } from "../../../../../shared/features/api/models/APIErrorResponse";
import { useNavigate } from "react-router-dom";
import { errorPageRoute } from "../../../constants/routes";



type IUseThinScreenImgVideoPlayer = {
    isVideoAvailable: boolean;
}

export function useThinScreenImgVideoPlayer({
    isVideoAvailable
}: IUseThinScreenImgVideoPlayer) {

    const imgVideoPlayerContainerRef = useRef<HTMLDivElement | null>(null);
    // const imgRef = useRef<HTMLImageElement | null>(null);
    const videoRef = useRef<HTMLDivElement | null>(null);

    // const [isVideoPlaying, setIsVideoPlaying] = 
    //     useState<boolean>(false);

    const [currDisplay, setCurrDisplay] = useState<"displaying" | "displayed" | "leaving" | "left">("left");

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

    const handleVideoActivate = () => {
        if (!isVideoAvailable || currDisplay === "displayed") return;

        setCurrDisplay("displaying");
    }

    const handleVideoDeactivate = () => {
        if (!isVideoAvailable || currDisplay === "left") return;

        setCurrDisplay("leaving");
    }

    const toggleVideoPlayState = () => {
        if (!isVideoAvailable) return;

        setCurrDisplay((prev) => {
            return (prev === "displaying" || prev === "displayed") ? 
                "leaving" : 
                "displaying"
        });
    }



    return {
        imgVideoPlayerContainerRef,
        // imgRef,
        videoRef,
        handleVideoActivate,
        handleVideoDeactivate,
        toggleVideoPlayState,
        // isVideoPlaying,
        currDisplay
    }
}