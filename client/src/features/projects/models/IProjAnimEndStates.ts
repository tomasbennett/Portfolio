import { IWideProjAnimationComponents, IWideProjTypes } from "./IProjAnimationState";

export type IProjAnimEndStates = Extract<
    IWideProjTypes,
    "appearing" | "disappearing" | "displaying" | "leaving"
>;


export type IProjAnimEndActions = Record<
    IProjAnimEndStates,
    (key: keyof IWideProjAnimationComponents) => void
>;