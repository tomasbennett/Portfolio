import { useMediaQuery } from "react-responsive";
import { thinScreenMaxWidth, mediumScreenMaxWidth } from "../constants/screenDimensions";
import { IScreenWidthDimension } from "../models/IScreenWidthDimension";
import { useScreenDimensions } from "./useScreenDimensions";




export function useAddScreenDimensionsClassNames(
    styles: { [key: string]: string }
) {


    const { screenDimension } = useScreenDimensions();

    const addScreenDimensionsClassNames = (baseClass: string): string => {

        let classNames: string = baseClass;

        if (screenDimension === "thin") {
            classNames += ` ${styles.thinScreen}`;
        }

        else if (screenDimension === "medium") {
            classNames += ` ${styles.mediumScreen}`;
        }

        else if (screenDimension === "wide") {
            classNames += ` ${styles.wideScreen}`;
        }

        return classNames;
    }

    const addRollingScreenDimensionsClassNames = (baseClass: string): string => {

        let classNames: string = baseClass;

        if (screenDimension === "thin") {
            classNames += ` ${styles.thinScreen}`;
        }

        if (screenDimension === "medium") {
            classNames += ` ${styles.mediumScreen}`;
        }

        if (screenDimension === "wide") {
            classNames += ` ${styles.wideScreen}`;
        }

        return classNames;
    }

    return {
        addScreenDimensionsClassNames,
        addRollingScreenDimensionsClassNames,
        screenDimension
    };



}