import styles from "./Contacts.module.css";


import githubProfImg from "../../../assets/github-profile-img.jpg";
import { ContactItem } from "../components/ContactItem";
import { SocialsItem } from "../components/SocialsItem";
import { GitHub } from "../../../assets/icons/languages/github";
import { LinkedIn } from "../../../assets/icons/LinkedIn";
import { useAddScreenDimensionsClassNames } from "../../../hooks/useAddScreenDimensionsClassNames";


export function Contacts() {

    const { 
        addScreenDimensionsClassNames,
        isWideScreen,
        isMediumScreen,
        isThinScreen
    } = useAddScreenDimensionsClassNames(styles);


    return (
        <>
        
            <footer className={styles.outerContainer}>

                <div className={addScreenDimensionsClassNames(styles.upperContainer)}>

                    <div className={addScreenDimensionsClassNames(styles.leftSide)}>
                        
                        <h1 className={styles.titleContainer}>

                            <span className={styles.title}>

                                {
                                    (isMediumScreen || isWideScreen) ? "Contact Me" : "Contacts"
                                }
                            </span>

                        </h1>

                        <div className={addScreenDimensionsClassNames(styles.contactsContainer)}>

                            <div className={addScreenDimensionsClassNames(styles.personalContainer)}>

                                <ContactItem 
                                    item="Email"
                                    value="tjs.bennett@gmail.com"
                                    href="mailto:tjs.bennett@gmail.com"
                                />

                                <ContactItem 
                                    item="Phone"
                                    value="+(44) 7985 798899"
                                />


                            </div>

                            <div className={addScreenDimensionsClassNames(styles.socialsContainer)}>

                                <SocialsItem 
                                    name="GitHub"
                                    href="https://github.com/tomasbennett"
                                    svg={<GitHub />}
                                />

                                <SocialsItem 
                                    name="LinkedIn"
                                    href="https://www.linkedin.com/in/tomasbennett/"
                                    svg={<LinkedIn />}
                                />

                            </div>



                        </div>

                    </div>

                    <div className={addScreenDimensionsClassNames(styles.rightSide)}>

                        <div className={styles.imgContainer}>
                            <img src={githubProfImg} alt="Github Profile Image" />
                        </div>

                    </div>

                </div>

                <div className={styles.lowerContainer}>
                    <p className={styles.copyrightContainer}>

                        <span className={styles.copyright}>
                            @ 2026 Portfolio | All Rights Reserved
                        </span>

                    </p>
                </div>




            </footer>
        
        
        
        
        </>
    )
}