import styles from "./ContactItem.module.css";

type IContactItemProps = {
    item: string;
    value: string;
    href?: string | undefined;
}

export function ContactItem({
    item,
    value,
    href
}: IContactItemProps) {
    const isClickable: boolean = !!href;

    return (
        <>

            <div className={styles.outerContainer}>

                <p className={styles.keyContainer}>
                    <span className={styles.key}>
                        {
                            `${item}:`
                        }
                    </span>
                </p>

                {
                    isClickable ?
                        <a className={`${styles.clickable} ${styles.valueContainer}`} target="_blank" rel="noopener noreferrer" href={href}>


                            <span className={styles.value}>
                                {value}
                            </span>



                        </a>


                        :

                        <div className={`${styles.unclickable} ${styles.valueContainer}`}>
                            <span className={styles.value}>
                                {value}
                            </span>
                        </div>


                }







            </div>







        </>
    )


}