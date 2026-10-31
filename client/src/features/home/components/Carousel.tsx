import React from "react";
import { Blender } from "../../../assets/icons/languages/blender";
import { CSS } from "../../../assets/icons/languages/css";
import { Express } from "../../../assets/icons/languages/express";
import { GIT } from "../../../assets/icons/languages/git";
import { GitHub } from "../../../assets/icons/languages/github";
import { HTML } from "../../../assets/icons/languages/html";
import { Inkscape } from "../../../assets/icons/languages/inkscape";
import { JS } from "../../../assets/icons/languages/javascript";
import { JESTjs } from "../../../assets/icons/languages/jestjs";
import { NodeJs } from "../../../assets/icons/languages/nodejs";
import { NPM } from "../../../assets/icons/languages/npm";
import { PostgreSQL } from "../../../assets/icons/languages/postgresql";
import { Postman } from "../../../assets/icons/languages/postman";
import { Prisma } from "../../../assets/icons/languages/prisma";
import { REACT } from "../../../assets/icons/languages/react";
import { TypeScript } from "../../../assets/icons/languages/typescript";
import { WebPack } from "../../../assets/icons/languages/webpack";
import styles from "./Carousel.module.css";
import { Item } from "./Item";



export function Carousel() {

    const items = (
        <>
            <Item svg={<HTML />} className={styles.html} />
            <Item svg={<NodeJs />} className={styles.nodejs} />
            <Item svg={<GitHub />} className={styles.github} />
            <Item svg={<Postman />} className={styles.postman} />
            <Item svg={<REACT />} className={styles.react} />
            <Item svg={<NPM />} />
            <Item svg={<TypeScript />} className={styles.ts} />
            <Item svg={<Prisma />} className={styles.prisma} />
            <Item svg={<WebPack />} className={styles.webpack} />

            <Item svg={<Blender />} className={styles.blender} />
            <Item svg={<CSS />} className={styles.css} />
            <Item svg={<Express />} />
            <Item svg={<GIT />} className={styles.git} />
            <Item svg={<PostgreSQL />} className={styles.postgresql} />
            <Item svg={<Inkscape />} className={styles.inkscape} />
            <Item svg={<JS />} className={styles.js} />
            <Item svg={<JESTjs />} className={styles.jest} />

        </>
    )



    return (
        <>

            <div className={styles.outerContainer}>

                <div className={styles.innerContainer}>

                    <div className={styles.sequence}>
                        {items}
                    </div>

                    <div className={styles.sequence} aria-hidden="true">
                        {items}
                    </div>


                </div>



            </div>

        </>
    )
}