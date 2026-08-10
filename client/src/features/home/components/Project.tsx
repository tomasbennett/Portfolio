import styles from "./Project.module.css";

type IProjectProps = {
    title: string;
    description: string;
    githubUrl: string;
}


export function Project({
    title,
    description,
    githubUrl
}: IProjectProps) {
  return (
    <div className={styles.outerContainer}>
      <h3>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            {title}
        </a>
      </h3>
      <p>{description}</p>
    </div>
  );
}