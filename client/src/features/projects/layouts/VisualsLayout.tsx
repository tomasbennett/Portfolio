import { useEffect, useRef, useState } from "react";
import styles from "./VisualsLayout.module.css";
import { useMediaQuery } from "react-responsive";
import { thinScreenMaxWidth, mediumScreenMaxWidth } from "../../../constants/screenDimensions";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";
import { ContentVideo } from "../components/ContentVideo";
import { useMediumScreenImgDisplay } from "../hooks/useMediumScreenImgDisplay";

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

    const [isDynamicAnimationPossible, setIsDynamicAnimationPossible] = useState<boolean>(false);

    const contentImgContainerRef = useRef<HTMLDivElement | null>(null);

    const {
        addScreenDimensionsClassNames,
        screenDimension
    } = useAddScreenDimensionsClassNames(styles);


    const {
        leftContentContainer,
        rightHomePageImgContainer,
        componentAnimationStates,
        handleActivate,
        handleDeactivate,
        togglePlayState
    } = useMediumScreenImgDisplay({
        isDynamicAnimationPossible: (isDynamicAnimationPossible && screenDimension === "medium"),
        contentImgContainerRef: contentImgContainerRef
    });

    
    return (
        <>

            <div 
                onAnimationEnd={() => { setIsDynamicAnimationPossible(true); }}
                className={addScreenDimensionsClassNames(styles.outerContainer)}>


                <ContentVideo 
                    defMainContentImgSrc={defMainContentImgSrc}
                    contentVideoSrc={contentVideoSrc}
                    handleActivate={handleActivate}
                    handleDeactivate={handleDeactivate}
                    togglePlayState={togglePlayState}
                    leftContentContainer={leftContentContainer}
                    rightHomePageImgContainer={rightHomePageImgContainer}
                    componentAnimationStates={componentAnimationStates}

                />



                {
                    !(screenDimension === "thin") && (
                        <div 
                            onMouseEnter={handleActivate}
                            onMouseLeave={handleDeactivate}
                            onFocus={handleActivate}
                            onBlur={handleDeactivate}
                            onClick={togglePlayState}
                            ref={rightHomePageImgContainer}
                            data-animation={componentAnimationStates.rightContainer}
                            className={addScreenDimensionsClassNames(styles.secondaryImgContainer)}>

                            {
                                (screenDimension === "wide") && (
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