export type IProjLoadingInState = "waiting" | "loaded" | "animating";


export type IProjAnimationState = "displaying" | "displayed" | "leaving" | "left";


export type IMediumProjAnimationComponents = {
    leftContainer: IProjAnimationState,
    rightContainer: IProjAnimationState,
}