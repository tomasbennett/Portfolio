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


import odinBookHomePage from "../../../assets/proj/img/odinbook_homepage.png";
import odinBookContentPage from "../../../assets/proj/img/odinbook_contentpage.png";
import odinBookGithubPage from "../../../assets/proj/img/odinbook_github.png";

import messagingAppHomePage from "../../../assets/proj/img/messagingapp_homepage.png";
import messagingAppContentPage from "../../../assets/proj/img/messagingapp_contentpage.png";
import messagingAppGithubPage from "../../../assets/proj/img/messagingapp_github.png";

import shoppingCartHomePage from "../../../assets/proj/img/shoppingcart_homepage.png";
import shoppingCartContentPage from "../../../assets/proj/img/shoppingcart_contentpage.png";
import shoppingCartGithubPage from "../../../assets/proj/img/shoppingcart_github.png";



export function ProjectsLayout() {




    return (
        <>

            <div className={styles.outerContainer}>

                <h1 className={`${styles.headerContainer}`}>

                    <span className={styles.header}>

                        Projects

                    </span>

                </h1>


                <div className={styles.projList}>

                    <div className={styles.projContainer}>

                        <VisualsLayout
                            defMainContentImgSrc={odinBookContentPage}
                            homePageImgSrc={odinBookHomePage}
                            githubImgSrc={odinBookGithubPage}
                            contentVideoSrc={""} />

                        <InfoLayout 
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

                    <div className={styles.projContainer}>

                        <VisualsLayout
                            defMainContentImgSrc={shoppingCartContentPage}
                            homePageImgSrc={shoppingCartHomePage}
                            githubImgSrc={shoppingCartGithubPage}
                            contentVideoSrc={""} />

                        <InfoLayout 
                            title={"Shopping Cart"} 
                            desc={"A template for a shopping cart project that accesses video game data from a JSON API and displays the results with sorting and filtering options."} 
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

                    <div className={styles.projContainer}>

                        <VisualsLayout
                            defMainContentImgSrc={messagingAppContentPage}
                            homePageImgSrc={messagingAppHomePage}
                            githubImgSrc={messagingAppGithubPage}
                            contentVideoSrc={""} />

                        <InfoLayout 
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