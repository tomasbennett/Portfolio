import React from "react";
import styles from "./Link.module.css";


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




    return (
        <>

            <a className={styles.link} rel="noopener noreferrer" target="_blank" href={href}>

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