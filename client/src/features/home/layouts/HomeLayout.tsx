import { Title } from "../components/Title";
import { FloorDesc } from "./FloorDesc";
import styles from "./HomeLayout.module.css";




export function HomeLayout() {

  return (
    <div className={styles.homeLayout}>

        <div className={styles.header}>
          
          <Title />

        </div>


        <div className={styles.floor}>

          <FloorDesc />

        </div>


    </div>
  );
}