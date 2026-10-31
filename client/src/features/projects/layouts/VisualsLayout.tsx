import { useState } from "react";
import styles from "./VisualsLayout.module.css";

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


    return (
        <>

            <div className={styles.outerContainer}>

                {/* <div className={styles.mainContentContainer}> */}


                <div className={styles.imgDisplayContainer}>

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



                <div className={styles.secondaryImgContainer}>

                    <div className={styles.githubImgContainer}>

                        <img className={styles.githubImg} src={githubImgSrc} alt="Github source code image" />

                    </div>

                    <div className={styles.homePageImgContainer}>

                        <img className={styles.homePageImg} src={homePageImgSrc} alt="Home page display image" />

                    </div>


                </div>


                {/* </div> */}


            </div>

        </>
    )
}