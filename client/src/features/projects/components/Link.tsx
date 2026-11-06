import React from "react";
import styles from "./Link.module.css";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";


type ILinkProps = {
    href: string;
    svg: React.ReactNode;
    text: string;
}

export function Link({
    href,
    svg,
    text
}: ILinkProps) {

    const {
        addScreenDimensionsClassNames,
    } = useAddScreenDimensionsClassNames(styles);


    return (
        <>

            <a 
                className={addScreenDimensionsClassNames(styles.link)} 
                rel="noopener noreferrer" target="_blank" href={href}>

                <div className={styles.livePrevSVGContainer}>

                    {
                        svg
                    }

                </div>

                <p className={styles.livePrevTextContainer}>

                    <span className={styles.livePrevText}>

                        {
                            text
                        }

                    </span>

                </p>

            </a>

        </>
    )
}