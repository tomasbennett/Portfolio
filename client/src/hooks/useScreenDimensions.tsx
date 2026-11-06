import { useMediaQuery } from "react-responsive";
import { thinScreenMaxWidth, mediumScreenMaxWidth } from "../constants/screenDimensions";
import { IScreenWidthDimension } from "../models/IScreenWidthDimension";

export function useScreenDimensions() {

    const isThinScreen: boolean = useMediaQuery({ maxWidth: thinScreenMaxWidth });
    const isMediumScreen: boolean = useMediaQuery({ minWidth: `${thinScreenMaxWidth}`, maxWidth: mediumScreenMaxWidth });
    const isWideScreen: boolean = useMediaQuery({ minWidth: `${mediumScreenMaxWidth}` });

    const screenDimension: IScreenWidthDimension = isThinScreen ? "thin" : isMediumScreen ? "medium" : "wide";


    return {
        screenDimension
    }

}