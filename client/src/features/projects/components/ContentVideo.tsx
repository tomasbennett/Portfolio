import { useState } from "react";
import styles from "./ContentVideo.module.css";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";
import { useThinScreenImgVideoPlayer } from "../hooks/useThinScreenImgVideoPlayer";
import { useMediumScreenImgDisplay } from "../hooks/useMediumScreenImgDisplay";
import { useWideScreenImgDisplay } from "../hooks/useWideScreenImgDisplay";
import { IProjVisualAnimationHookReturn } from "../models/IProjVisualAnimationHookReturn";
import { IMediumProjAnimationComponents, IProjAnimationState, IWideProjAnimationComponents, IWideProjTypes } from "../models/IProjAnimationState";


type IContentVideoProps = {
    contentVideoSrc: string;
    defMainContentImgSrc: string;
    leftContentContainer: React.RefObject<HTMLDivElement | null>;
    mediumImgContainerAnimationStates: IProjAnimationState | undefined;
    wideImgContainerAnimationStates: IWideProjTypes | undefined;
} & Partial<IProjVisualAnimationHookReturn>;

export function ContentVideo({
    contentVideoSrc,
    defMainContentImgSrc,
    handleActivate,
    handleDeactivate,
    togglePlayState,
    leftContentContainer,
    mediumImgContainerAnimationStates,
    wideImgContainerAnimationStates
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
        currDisplay: thinCurrDisplay
    } = useThinScreenImgVideoPlayer({
        isVideoAvailable: (isVideoPossible && screenDimension === "thin"),
        imgVideoPlayerContainerRef: leftContentContainer
    });



    const isThinScreen = screenDimension === "thin";


    const onActivate = isThinScreen
        ? handleThinVideoActivate
        : handleActivate;

    const onDeactivate = isThinScreen
        ? handleThinVideoDeactivate
        : handleDeactivate;

    const onTogglePlayState = isThinScreen
        ? toggleThinPlayState
        : togglePlayState;


    



    return (
        <>
            <div
                onMouseEnter={onActivate}
                onMouseLeave={onDeactivate}
                onFocus={onActivate}
                onBlur={onDeactivate}
                ref={leftContentContainer}
                onClick={onTogglePlayState}
                data-animation={mediumImgContainerAnimationStates ?? wideImgContainerAnimationStates}
                // tabIndex={0}
                className={addScreenDimensionsClassNames(styles.imgDisplayContainer)}>

                {
                    (
                        isVideoPossible &&
                        (
                            screenDimension !== "thin" ||
                            thinCurrDisplay !== "left"
                        )
                    ) && (
                        <div
                            ref={videoRef}
                            data-animation={thinCurrDisplay}
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
                            thinCurrDisplay !== "displayed"
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