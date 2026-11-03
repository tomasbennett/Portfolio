import { useMediaQuery } from "react-responsive";
import { thinScreenMaxWidth, mediumScreenMaxWidth } from "../constants/screenDimensions";




export function useAddScreenDimensionsClassNames(
    styles: { [key: string]: string }
) {

    
    const isThinScreen: boolean = useMediaQuery({ maxWidth: thinScreenMaxWidth });
    const isMediumScreen: boolean = useMediaQuery({ minWidth: `${thinScreenMaxWidth}`, maxWidth: mediumScreenMaxWidth });
    const isWideScreen: boolean = useMediaQuery({ minWidth: `${mediumScreenMaxWidth}` });

    const addScreenDimensionsClassNames = (baseClass: string): string => {

        let classNames: string = baseClass;

        if (isThinScreen) {
            classNames += ` ${styles.thinScreen}`;
        } 
        
        if (isMediumScreen) {
            classNames += ` ${styles.mediumScreen}`;
        } 
        
        if (isWideScreen) {
            classNames += ` ${styles.wideScreen}`;
        }

        return classNames;
    }

    return {
        addScreenDimensionsClassNames,
        isThinScreen,
        isMediumScreen,
        isWideScreen
    };



}