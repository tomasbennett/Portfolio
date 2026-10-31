import React from "react";
import styles from "./LanguageTile.module.css";



type ILanguageTileProps = {
    name: string;
    svg: React.ReactNode;
}

export function LanguageTile({
    name,
    svg
}: ILanguageTileProps) {




    return (
        <>
        
            <div className={styles.outerContainer}>

                <div className={styles.svgContainer}>

                    {
                        svg
                    }

                </div>

                <p className={styles.nameContainer}>

                    <span>
                        {
                            name
                        }
                    </span>

                </p>

            </div>
        
        
        </>
    )
}