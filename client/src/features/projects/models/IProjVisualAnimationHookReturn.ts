import { IElementEventTypes } from "./ElementEventTypes";

export type IProjVisualAnimationHookReturn = {
    handleActivate: (e: IElementEventTypes) => void;

    handleDeactivate: (e: IElementEventTypes) => void;

    togglePlayState: (e: IElementEventTypes) => void;

}