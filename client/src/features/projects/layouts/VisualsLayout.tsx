import { useEffect, useRef, useState } from "react";
import styles from "./VisualsLayout.module.css";
import { useMediaQuery } from "react-responsive";
import { thinScreenMaxWidth, mediumScreenMaxWidth } from "../../../constants/screenDimensions";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";
import { ContentVideo } from "../components/ContentVideo";
import { useMediumScreenImgDisplay } from "../hooks/useMediumScreenImgDisplay";
import { useWideScreenImgDisplay } from "../hooks/useWideScreenImgDisplay";

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


    const isMediumScreen = screenDimension === "medium";
    const isWideScreen = screenDimension === "wide";


    const {
        // leftContentContainer,
        rightHomePageImgContainer,
        componentAnimationStates: mediumComponentAnimationStates,
        handleActivate: handleMediumActivate,
        handleDeactivate: handleMediumScreenDeactivate,
        togglePlayState: toggleMediumScreenPlayState
    } = useMediumScreenImgDisplay({
        isDynamicAnimationPossible: (isDynamicAnimationPossible && screenDimension === "medium"),
        contentImgContainerRef: contentImgContainerRef
    });



    const {
        githubImgContainerRef,
        homePageImgContainerRef,
        componentAnimationStates: wideScreenComponentAnimationStates,
        handleActivate: handleWideScreenActivate,
        handleDeactivate: handleWideScreenDeactivate,
        togglePlayState: toggleWideScreenPlayState
    } = useWideScreenImgDisplay({
        contentImgContainerRef,
        isAnimatingPossible: (isDynamicAnimationPossible && screenDimension === "wide")
    });


    const onAnimationActivate = isWideScreen
        ? handleWideScreenActivate
        : isMediumScreen
            ? handleMediumActivate
            : undefined;


    const onAnimationDeactivate = isWideScreen
        ? handleWideScreenDeactivate
        : isMediumScreen
            ? handleMediumScreenDeactivate
            : undefined;


    const onAnimationToggle = isWideScreen
        ? toggleWideScreenPlayState
        : isMediumScreen
            ? toggleMediumScreenPlayState
            : undefined;




    // const animationStates = isWideScreen 
    //     ? wideScreenComponentAnimationStates
    //     : isMediumScreen
    //         ? mediumComponentAnimationStates
    //         : undefined;


    return (
        <>

            <div
                onAnimationEnd={() => { setIsDynamicAnimationPossible(true); }}
                className={addScreenDimensionsClassNames(styles.outerContainer)}>


                <ContentVideo
                    defMainContentImgSrc={defMainContentImgSrc}
                    contentVideoSrc={contentVideoSrc}
                    leftContentContainer={contentImgContainerRef}
                    mediumImgContainerAnimationStates={isMediumScreen ? mediumComponentAnimationStates.contentContainer : undefined}
                    wideImgContainerAnimationStates={isWideScreen ? wideScreenComponentAnimationStates.contentContainer.animState : undefined}
                    handleActivate={onAnimationActivate}
                    handleDeactivate={onAnimationDeactivate}
                    togglePlayState={onAnimationToggle}

                />



                {
                    !(screenDimension === "thin") && (
                        <div
                            onMouseEnter={handleMediumActivate}
                            onMouseLeave={handleMediumScreenDeactivate}
                            onFocus={handleMediumActivate}
                            onBlur={handleMediumScreenDeactivate}
                            onClick={toggleMediumScreenPlayState}
                            data-animation={mediumComponentAnimationStates.homePageImgContainer}
                            ref={rightHomePageImgContainer}
                            className={addScreenDimensionsClassNames(styles.secondaryImgContainer)}>

                            {
                                (screenDimension === "wide") && (
                                    <div
                                        onMouseEnter={handleWideScreenActivate}
                                        onMouseLeave={handleWideScreenDeactivate}
                                        onFocus={handleWideScreenActivate}
                                        onBlur={handleWideScreenDeactivate}
                                        onClick={toggleWideScreenPlayState}
                                        ref={githubImgContainerRef}
                                        data-animation={wideScreenComponentAnimationStates.githubImgContainer.animState}
                                        className={addScreenDimensionsClassNames(styles.githubImgContainer)}>

                                        <img className={styles.githubImg} src={githubImgSrc} alt="Github source code image" />

                                    </div>
                                )
                            }


                            <div
                                onMouseEnter={handleWideScreenActivate}
                                onMouseLeave={handleWideScreenDeactivate}
                                onFocus={handleWideScreenActivate}
                                onBlur={handleWideScreenDeactivate}
                                onClick={toggleWideScreenPlayState}
                                data-animation={wideScreenComponentAnimationStates.homePageImgContainer.animState}
                                ref={homePageImgContainerRef}
                                className={addScreenDimensionsClassNames(styles.homePageImgContainer)}>

                                <img className={styles.homePageImg} src={homePageImgSrc} alt="Home page display image" />

                            </div>


                        </div>
                    )
                }



            </div>

        </>
    )
}