import styles from "./Item.module.css";

type IItemProps = {
    svg: React.ReactNode;
    className?: string | undefined;
}


export function Item({
    svg,
    className
}: IItemProps) {



    return (
        <>
        

            <div className={`${styles.outerContainer} ${className ?? styles.basicContainer}`}>


                {
                    svg
                }



            </div>
        
        
        </>
    )
}