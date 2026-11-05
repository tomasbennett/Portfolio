import { useState } from "react";
import styles from "./ContentVideo.module.css";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";
import { useThinScreenImgVideoPlayer } from "../hooks/useThinScreenImgVideoPlayer";


type IContentVideoProps = {
    contentVideoSrc: string;
    defMainContentImgSrc: string;
}

export function ContentVideo({
    contentVideoSrc,
    defMainContentImgSrc
}: IContentVideoProps) {

    //ONE FOR LOADING IN KEEP THE IMG VISIBLE VERSUS IS THE VIDEO EVEN POSSIBLE IN THE FIRST PLACE
    //IF THE VIDEO IS NOT POSSIBLE THEN OBVIOUSLY THE CONTENT HAS TO BE IMG

    const [isVideoPossible, setIsVideoPossible] = useState<boolean>(!!contentVideoSrc);

    const {
        addScreenDimensionsClassNames,
    } = useAddScreenDimensionsClassNames(styles);


    const {
        imgVideoPlayerContainerRef,
        videoRef,
        handleVideoActivate,
        handleVideoDeactivate,
        toggleVideoPlayState,
        currDisplay
    } = useThinScreenImgVideoPlayer({
        isVideoAvailable: isVideoPossible
    });


    return (
        <>
            <div
                onMouseEnter={handleVideoActivate}
                onMouseLeave={handleVideoDeactivate}
                onFocus={handleVideoActivate}
                onBlur={handleVideoDeactivate}
                ref={imgVideoPlayerContainerRef}
                onClick={toggleVideoPlayState}
                className={addScreenDimensionsClassNames(styles.imgDisplayContainer)}>

                {
                    (
                        isVideoPossible && 
                        currDisplay !== "left"
                    ) && (
                        <div 
                            ref={videoRef}
                            data-animation={currDisplay}
                            className={addScreenDimensionsClassNames(styles.videoContainer)}>
                            <video
                                src={contentVideoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                // onLoadedData={() => { setIsVideoLoaded(true); }}
                                onError={() => { setIsVideoPossible(false); }}
                                className={addScreenDimensionsClassNames(styles.videoContent)}
                            />
                        </div>

                    )
                }


                {
                    (
                        currDisplay !== "displayed"
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