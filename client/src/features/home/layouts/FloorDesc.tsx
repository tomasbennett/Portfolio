import { Carousel } from "../components/Carousel";
import styles from "./FloorDesc.module.css";




export function FloorDesc() {



    return (
        <>
        
            <div className={styles.outerContainer}>

                <p className={styles.aboutContainer}>

                    <span className={styles.about}>
                        Experience with tools and languages for building fullstack projects in both web and software development.
                    </span>

                </p>


                <div className={styles.carouselContainer}>

                    <Carousel />

                </div>


            </div>
        
        
        
        </>
    )
}