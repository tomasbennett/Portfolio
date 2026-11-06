import { useState } from "react";
import styles from "./ContentVideo.module.css";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";
import { useThinScreenImgVideoPlayer } from "../hooks/useThinScreenImgVideoPlayer";
import { useMediumScreenImgDisplay } from "../hooks/useMediumScreenImgDisplay";


type IContentVideoProps = {
    contentVideoSrc: string;
    defMainContentImgSrc: string;
} & ReturnType<typeof useMediumScreenImgDisplay>;

export function ContentVideo({
    contentVideoSrc,
    defMainContentImgSrc,
    handleActivate: handleMediumActivate,
    handleDeactivate: handleMediumDeactivate,
    togglePlayState: toggleMediumPlayState,
    rightHomePageImgContainer,
    leftContentContainer,
    componentAnimationStates
}: IContentVideoProps) {

    const [isVideoPossible, setIsVideoPossible] = useState<boolean>(!!contentVideoSrc);
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);


    const {
        addScreenDimensionsClassNames,
        screenDimension
    } = useAddScreenDimensionsClassNames(styles);



    const {
        // imgVideoPlayerContainerRef,
        videoRef,
        handleActivate: handleThinVideoActivate,
        handleDeactivate: handleThinVideoDeactivate,
        togglePlayState: toggleThinPlayState,
        currDisplay
    } = useThinScreenImgVideoPlayer({
        isVideoAvailable: (isVideoPossible && screenDimension === "thin"),
        imgVideoPlayerContainerRef: leftContentContainer
    });



    const isThinScreen = screenDimension === "thin";

    const onActivate = isThinScreen
        ? handleThinVideoActivate
        : handleMediumActivate;

    const onDeactivate = isThinScreen
        ? handleThinVideoDeactivate
        : handleMediumDeactivate;

    const onTogglePlayState = isThinScreen
        ? toggleThinPlayState
        : toggleMediumPlayState;


    return (
        <>
            <div
                onMouseEnter={onActivate}
                onMouseLeave={onDeactivate}
                onFocus={onActivate}
                onBlur={onDeactivate}
                ref={leftContentContainer}
                onClick={onTogglePlayState}
                data-animation={componentAnimationStates.leftContainer}
                // tabIndex={0}
                className={addScreenDimensionsClassNames(styles.imgDisplayContainer)}>

                {
                    (
                        isVideoPossible &&
                        (
                            screenDimension !== "thin" ||
                            currDisplay !== "left"
                        )
                    ) && (
                        <div
                            ref={videoRef}
                            data-animation={currDisplay}
                            data-video-loaded={isVideoLoaded}
                            className={addScreenDimensionsClassNames(styles.videoContainer)}>
                            <video
                                src={contentVideoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                onLoadedData={() => { setIsVideoLoaded(true); }}
                                onError={() => { setIsVideoPossible(false); }}
                                className={addScreenDimensionsClassNames(styles.videoContent)}
                            />
                        </div>

                    )
                }


                {
                    (
                        (
                            screenDimension !== "thin" ||
                            currDisplay !== "displayed"
                        )
                    ) && (
                        <div className={addScreenDimensionsClassNames(styles.imgContainer)}>
                            <img className={addScreenDimensionsClassNames(styles.mainImg)} src={defMainContentImgSrc} alt="Main Content Image" />
                        </div>
                    )
                }


            </div>





        </>
    )
}