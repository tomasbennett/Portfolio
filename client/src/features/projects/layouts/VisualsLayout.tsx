import { useEffect, useState } from "react";
import styles from "./VisualsLayout.module.css";
import { useMediaQuery } from "react-responsive";
import { thinScreenMaxWidth, mediumScreenMaxWidth } from "../../../constants/screenDimensions";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";

type IVisualsLayoutProps = {
    defMainContentImgSrc: string;
    homePageImgSrc: string;
    githubImgSrc: string;
    contentVideoSrc: string;
}

export function VisualsLayout({
    defMainContentImgSrc,
    homePageImgSrc,
    githubImgSrc,
    contentVideoSrc
}: IVisualsLayoutProps) {

    const [mainContent, setMainContent] = useState<"video" | "img">("img");
    const isVideoAvailable: boolean = !!contentVideoSrc;


    const handleLoad = () => {
        setMainContent("video");
    }

    const { 
        addScreenDimensionsClassNames,
        isWideScreen,
        isThinScreen
    } = useAddScreenDimensionsClassNames(styles);


    return (
        <>

            <div className={addScreenDimensionsClassNames(styles.outerContainer)}>


                <div className={addScreenDimensionsClassNames(styles.imgDisplayContainer)}>

                    {
                        isVideoAvailable && (
                            <video
                                src={contentVideoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                onLoadedData={handleLoad}
                            />
                        )
                    }


                    <img className={`${styles.mainImg} ${mainContent === "video" ? styles.videoLoaded : styles.noVideo}`} src={defMainContentImgSrc} alt="Main Content Image" />

                </div>



                {
                    !isThinScreen && (
                        <div className={addScreenDimensionsClassNames(styles.secondaryImgContainer)}>

                            {
                                isWideScreen && (
                                    <div className={styles.githubImgContainer}>

                                        <img className={styles.githubImg} src={githubImgSrc} alt="Github source code image" />

                                    </div>
                                )
                            }


                            <div className={addScreenDimensionsClassNames(styles.homePageImgContainer)}>

                                <img className={styles.homePageImg} src={homePageImgSrc} alt="Home page display image" />

                            </div>


                        </div>
                    )
                }



            </div>

        </>
    )
}