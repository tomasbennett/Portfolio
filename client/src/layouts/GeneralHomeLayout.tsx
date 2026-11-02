import { Outlet } from "react-router-dom";
import styles from "./GeneralHomeLayout.module.css";



export function GeneralHomeLayout() {
  return (
    <div id="background-container" className={styles.backgroundContainer}>

        <Outlet />
        
    </div>
  );
}   