import { Project } from "../components/Project";
import styles from "./HomeLayout.module.css";




export function HomeLayout() {
  return (
    <div className={styles.homeLayout}>
      <h1>Home Layout</h1>
      <h2>Check out some of these projects:</h2>
      <ul>
        <li>
            <Project 
                title="Odin Book"
                description="A social media app built with React, Express, Typescript and Node.js."
                githubUrl="https://github.com/tomasbennett/Odin-Book"
            />
        </li>
        <li>
            <Project 
                title="Shopping Cart App"
                description="A shopping cart app built with React, Express, Typescript and Node.js."
                githubUrl="https://github.com/tomasbennett/Shopping-Cart-Project-Public"
            />
        </li>
        <li>
            <Project 
                title="Messaging App"
                description="A messaging app built with React, Express, Typescript and Node.js."
                githubUrl="https://github.com/tomasbennett/Messaging-App"
            />
        </li>
      </ul>
    </div>
  );
}