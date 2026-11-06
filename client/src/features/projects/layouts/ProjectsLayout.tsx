import { Express } from "../../../assets/icons/languages/express";
import { JS } from "../../../assets/icons/languages/javascript";
import { NodeJs } from "../../../assets/icons/languages/nodejs";
import { PostgreSQL } from "../../../assets/icons/languages/postgresql";
import { Prisma } from "../../../assets/icons/languages/prisma";
import { REACT } from "../../../assets/icons/languages/react";
import { TypeScript } from "../../../assets/icons/languages/typescript";
import { WebPack } from "../../../assets/icons/languages/webpack";
import { InfoLayout } from "./InfoLayout";
import styles from "./ProjectsLayout.module.css";
import { VisualsLayout } from "./VisualsLayout";
import React, { useEffect, useState } from "react";
import { IProjLoadingInState } from "../models/IProjAnimationState";
import { useScrollLoadIn } from "../../../hooks/useScrollLoadIn";
import { useMediaQuery } from "react-responsive";
import { thinScreenMaxWidth, mediumScreenMaxWidth } from "../../../constants/screenDimensions";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";



import odinBookHomePage from "../../../assets/proj/img/odinbook_homepage.png";
import odinBookContentPage from "../../../assets/proj/img/odinbook_contentpage.png";
import odinBookGithubPage from "../../../assets/proj/img/odinbook_github.png";
import odinBookPresentationVideo from "../../../assets/proj/videos/odinbook-presentationvideo.mp4";

import messagingAppHomePage from "../../../assets/proj/img/messagingapp_homepage.png";
import messagingAppContentPage from "../../../assets/proj/img/messagingapp_contentpage.png";
import messagingAppGithubPage from "../../../assets/proj/img/messagingapp_github.png";

import shoppingCartHomePage from "../../../assets/proj/img/shoppingcart_homepage.png";
import shoppingCartContentPage from "../../../assets/proj/img/shoppingcart_contentpage.png";
import shoppingCartGithubPage from "../../../assets/proj/img/shoppingcart_github.png";
import shoppingCartPresentationVideo from "../../../assets/proj/videos/shoppingcart-presentationvideo.mp4";


export function ProjectsLayout() {

    const [isOdinBookAnimating, setIsOdinBookAnimating] = useState<IProjLoadingInState>("waiting");
    const [isShoppingCartAnimating, setIsShoppingCartAnimating] = useState<IProjLoadingInState>("waiting");
    const [isMessagingAppAnimating, setIsMessagingAppAnimating] = useState<IProjLoadingInState>("waiting");

    const threshold: number = 0.4;

    const { isVisible: isOdinBookVisible, elementRef: odinBookElementRef } = useScrollLoadIn({ threshold: threshold });
    const { isVisible: isShoppingCartVisible, elementRef: shoppingCartElementRef } = useScrollLoadIn({ threshold: threshold });
    const { isVisible: isMessagingAppVisible, elementRef: messagingAppElementRef } = useScrollLoadIn({ threshold: threshold });

    const handleThresholdTrigger = (element: HTMLDivElement | null, isStateVisible: boolean, setAnimationState: React.Dispatch<React.SetStateAction<IProjLoadingInState>>) => {
        if (!element) {
            return;
        }

        const handleAnimationEnd = () => {
            setAnimationState("loaded");
        };

        if (isStateVisible) {
            setAnimationState("animating");

            element.addEventListener("animationend", handleAnimationEnd);
        }




        return () => {
            if (!element) {
                return;
            }

            setAnimationState("waiting");
            element.removeEventListener("animationend", handleAnimationEnd);
        }

    }


    useEffect(() => {
        const element = odinBookElementRef.current;

        const returnFunc = handleThresholdTrigger(element, isOdinBookVisible, setIsOdinBookAnimating);



        return returnFunc;

    }, [isOdinBookVisible]);

    useEffect(() => {

        const element = shoppingCartElementRef.current;

        const returnFunc = handleThresholdTrigger(element, isShoppingCartVisible, setIsShoppingCartAnimating);

        return returnFunc;
    }, [isShoppingCartVisible]);

    useEffect(() => {

        const element = messagingAppElementRef.current;

        const returnFunc = handleThresholdTrigger(element, isMessagingAppVisible, setIsMessagingAppAnimating);

        return returnFunc;

    }, [isMessagingAppVisible]);

    const { 
        addScreenDimensionsClassNames,
    } = useAddScreenDimensionsClassNames(styles);


    return (
        <>

            <div className={styles.outerContainer}>

                <h1 className={`${styles.headerContainer}`}>

                    <span className={styles.header}>

                        Projects

                    </span>

                </h1>


                <div className={styles.projList}>

                    <div 
                        ref={odinBookElementRef} 
                        data-animation={isOdinBookAnimating} 
                        className={addScreenDimensionsClassNames(styles.projContainer)}>

                        <VisualsLayout
                            defMainContentImgSrc={odinBookContentPage}
                            homePageImgSrc={odinBookHomePage}
                            githubImgSrc={odinBookGithubPage}
                            contentVideoSrc={odinBookPresentationVideo} />

                        <InfoLayout
                            direction="odd"
                            title={"Odin Book"}
                            desc={"A social media type web application that utilises oauth 2.0 with PKCE and allows users to post and comment or reply to other users posts."}
                            livePreviewLink={"https://odin-book-9t7a.onrender.com"}
                            clientLink={"https://github.com/tomasbennett/Odin-Book/tree/main/client"}
                            serverLink={"https://github.com/tomasbennett/Odin-Book/tree/main/server"}
                            languages={[
                                {
                                    name: "react",
                                    svg: <REACT />
                                },
                                {
                                    name: "typescript",
                                    svg: <TypeScript />
                                },
                                {
                                    name: "express",
                                    svg: <Express />
                                },
                                {
                                    name: "nodejs",
                                    svg: <NodeJs />
                                },
                                {
                                    name: "prisma",
                                    svg: <Prisma />
                                },
                                {
                                    name: "postgresql",
                                    svg: <PostgreSQL />
                                }
                            ]} />

                    </div>

                    <div 
                        ref={shoppingCartElementRef} 
                        data-animation={isShoppingCartAnimating} 
                        className={addScreenDimensionsClassNames(styles.projContainer)}>

                        <VisualsLayout
                            defMainContentImgSrc={shoppingCartContentPage}
                            homePageImgSrc={shoppingCartHomePage}
                            githubImgSrc={shoppingCartGithubPage}
                            contentVideoSrc={shoppingCartPresentationVideo} />

                            

                        <InfoLayout
                            direction="even"
                            title={"Shopping Cart"}
                            desc={`
                                A template for a shopping cart project that accesses video game data from a JSON API and displays the results with sorting and filtering options.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, corporis tenetur. Quia quas voluptas eligendi repellat porro tempora mollitia ea cupiditate deleniti autem veritatis dolore, incidunt iste quasi, aut cumque? Maxime nisi voluptatibus recusandae ut rem atque, officiis ad magnam incidunt veniam aperiam eveniet explicabo hic non! Velit temporibus rem a consectetur porro iusto, nostrum tempora natus tempore aliquam. Debitis dolore perspiciatis voluptate minima doloribus sequi vel id? Accusantium totam aut doloribus, perspiciatis necessitatibus id veritatis accusamus debitis cum iste dicta dignissimos minima dolores commodi sequi. Quisquam reiciendis nisi, autem ipsum repellendus, accusantium iusto laborum dolorum qui veritatis eligendi neque?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio optio facilis vitae nihil qui mollitia? Corrupti dolore nobis excepturi, inventore alias vero expedita harum vitae quia. Veritatis, iste repellendus rerum amet reprehenderit ea modi eius dignissimos facere. Iure iusto odit quasi quisquam tenetur dignissimos possimus quibusdam, veniam unde error, officiis provident, non nesciunt exercitationem explicabo atque fugiat labore autem! Quibusdam beatae distinctio ex, temporibus, reprehenderit nesciunt error perferendis modi cum omnis illum sit sapiente eius obcaecati! Nam minus corporis, exercitationem mollitia similique laborum saepe assumenda nulla eveniet! Recusandae, sint magnam quam quae, id excepturi saepe consectetur consequatur nemo culpa quo odio vero cumque velit voluptate pariatur, eaque commodi modi? Doloribus quas mollitia perspiciatis laborum culpa facere incidunt ad voluptatum aut sit nisi corrupti sequi, doloremque dolorem odit molestias expedita aspernatur! Veniam inventore nulla dolor consequatur sint veritatis. Voluptates dolor, magni illum dolorem rerum cupiditate accusantium est autem. Eos, repudiandae magnam laboriosam quaerat, voluptatum unde doloribus quos, exercitationem cum veniam praesentium natus nostrum harum iusto accusamus nam. Nemo excepturi ullam quaerat at asperiores quod sed, quas ratione dolorem atque doloremque voluptates ea impedit reprehenderit nam ipsum. Magnam est perferendis obcaecati maxime quisquam tenetur non aliquid explicabo, dicta vero laudantium impedit fugit!
                                `}
                            livePreviewLink={"https://shopping-cart-proj.netlify.app"}
                            clientLink={"https://github.com/tomasbennett/Shopping-Cart-Project-Public"}
                            languages={[
                                {
                                    name: "react",
                                    svg: <REACT />
                                },
                                {
                                    name: "typescript",
                                    svg: <TypeScript />
                                },
                                {
                                    name: "javascript",
                                    svg: <JS />
                                },
                                {
                                    name: "webpack",
                                    svg: <WebPack />
                                }
                            ]} />

                    </div>

                    <div 
                        ref={messagingAppElementRef}
                        data-animation={isMessagingAppAnimating} 
                        className={addScreenDimensionsClassNames(styles.projContainer)}>

                        <VisualsLayout
                            defMainContentImgSrc={messagingAppContentPage}
                            homePageImgSrc={messagingAppHomePage}
                            githubImgSrc={messagingAppGithubPage}
                            contentVideoSrc={""} />

                        <InfoLayout
                            direction="odd"
                            title={"Messaging App"}
                            desc={"This project is a web based messaging app in which users can talk to one another in real time."}
                            clientLink={"https://github.com/tomasbennett/Messaging-App/tree/main/client"}
                            serverLink={"https://github.com/tomasbennett/Messaging-App/tree/main/server"}
                            languages={[
                                {
                                    name: "react",
                                    svg: <REACT />
                                },
                                {
                                    name: "typescript",
                                    svg: <TypeScript />
                                },
                                {
                                    name: "javascript",
                                    svg: <JS />
                                },
                                {
                                    name: "webpack",
                                    svg: <WebPack />
                                },
                                {
                                    name: "express",
                                    svg: <Express />
                                },
                                {
                                    name: "nodejs",
                                    svg: <NodeJs />
                                },
                                {
                                    name: "prisma",
                                    svg: <Prisma />
                                },
                                {
                                    name: "postgresql",
                                    svg: <PostgreSQL />
                                }
                            ]} />

                    </div>

                </div>


            </div>

        </>
    )
}