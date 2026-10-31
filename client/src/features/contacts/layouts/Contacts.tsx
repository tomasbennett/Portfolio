import styles from "./Contacts.module.css";


import githubProfImg from "../../../assets/github-profile-img.jpg";
import { ContactItem } from "../components/ContactItem";
import { SocialsItem } from "../components/SocialsItem";
import { GitHub } from "../../../assets/icons/languages/github";
import { LinkedIn } from "../../../assets/icons/LinkedIn";


export function Contacts() {




    return (
        <>
        
            <footer className={styles.outerContainer}>

                <div className={styles.upperContainer}>

                    <div className={styles.leftSide}>
                        <h1 className={styles.titleContainer}>

                            <span className={styles.title}>
                                Contact Me
                            </span>

                        </h1>

                        <div className={styles.contactsContainer}>

                            <div className={styles.personalContainer}>

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

                            <div className={styles.socialsContainer}>

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

                    <div className={styles.rightSide}>

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