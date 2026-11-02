import { ArrowIcon } from "../../../assets/icons/ArrowIcon";
import styles from "./Title.module.css";




export function Title() {



    return (
        <>
        
            <header className={styles.header}>

                <h2 className={styles.nameContainer}>

                    <span className={styles.name}>
                        Tomas Bennett
                    </span>

                </h2>

                <h1 className={`${styles.titleContainer}`}>

                    <span className={styles.title}>
                        Portfolio
                    </span>

                </h1>

                <div className={styles.descContainer}>

                    <span className={styles.desc}>
                        Aspiring fullstack developer in Node.js | TypeScript | React
                    </span>

                </div>

                <div onClick={() => {
                    const contactSection = document.getElementById("background-container");

                    if (contactSection) {
                        contactSection.scrollTo({
                            top: contactSection.scrollHeight,
                            behavior: "smooth"
                        });
                    }
                    
                }} className={styles.getInTouchContainer}>

                    <div className={styles.svgContainer}>

                        <ArrowIcon />

                    </div>

                    <p className={styles.textContainer}>

                        <span className={styles.text}>
                            Get in touch
                        </span>

                    </p>

                </div>

                

            </header>

        
        </>
    )
}