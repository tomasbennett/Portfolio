import { HTMLTagIcon } from "../../../assets/icons/HTMLTagIcon";
import { JSONTagIcon } from "../../../assets/icons/JSONTagIcon";
import { TabIcon } from "../../../assets/icons/TabIcon";
import { LanguageTile } from "../components/LanguageTile";
import { Link } from "../components/Link";
import styles from "./InfoLayout.module.css";


type IInfoLayout = {
    title: string;
    desc: string;
    livePreviewLink?: string | undefined;
    clientLink: string;
    serverLink?: string | undefined;
    languages: { name: string, svg: React.ReactNode }[]
}


export function InfoLayout({
    title,
    desc,
    livePreviewLink,
    clientLink,
    serverLink,
    languages
}: IInfoLayout) {

    const isLivePreviewAvailable: boolean = !!livePreviewLink;
    const isServerCodeAvailable: boolean = !!serverLink;



    return (
        <>

            <div className={`${styles.outerContainer}`}>

                <h2 className={styles.titleContainer}>

                    <span className={styles.title}>
                        {title}
                    </span>

                </h2>

                <div className={styles.languageList}>

                    {
                        languages.map((lan) => {

                            return (
                                <LanguageTile
                                    key={lan.name}
                                    name={lan.name}
                                    svg={lan.svg}
                                />
                            )
                        })
                    }

                </div>


                <p className={styles.infoContainer}>

                    <span className={styles.info}>

                        {desc}

                    </span>

                </p>

                <div className={styles.linkBtnContainer}>

                    {
                        isLivePreviewAvailable && (
                            <div className={styles.upperContainer}>

                                <Link
                                    href={livePreviewLink!}
                                    text="Live Preview"
                                    svg={<TabIcon />}
                                />

                            </div>

                        )
                    }


                    <div className={styles.lowerContainer}>

                        <Link
                            href={clientLink}
                            text="Client"
                            svg={<HTMLTagIcon />}
                        />

                        {
                            isServerCodeAvailable && (
                                <Link
                                    href={serverLink!}
                                    text="Server"
                                    svg={<JSONTagIcon />}
                                />
                            )
                        }


                    </div>



                </div>




            </div>

        </>
    )
}