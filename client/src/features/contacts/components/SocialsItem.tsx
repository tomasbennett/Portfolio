import styles from "./SocialsItem.module.css";

type ISocialsItemProps = {
    svg: React.ReactNode;
    name: string
    href: string;
}


export function SocialsItem({
    svg,
    name,
    href
}: ISocialsItemProps) {


    return (
        <>
        
            <a target="_blank" rel="noopener noreferrer" href={href} 
                className={styles.outerContainer}>

                <div className={styles.svgContainer}>
                    {svg}
                </div>

                <p className={styles.nameContainer}>
                    <span className={styles.name}>
                        {name}
                    </span>
                </p>

            </a>
        
        
        </>
    )

}