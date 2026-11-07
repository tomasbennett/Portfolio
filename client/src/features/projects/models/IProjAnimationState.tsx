export type IProjLoadingInState = "waiting" | "loaded" | "animating";


export type IProjAnimationState = "displaying" | "displayed" | "leaving" | "left";


export type IMediumProjAnimationComponents = {
    contentContainer: IProjAnimationState,
    homePageImgContainer: IProjAnimationState,
}


export type IProjDissappearanceState = "disappearing" | "disappeared" | "appearing" | "appeared";


export type IWideProjTypes = IProjDissappearanceState | IProjAnimationState;

export type IWideProjReferenceTypes = {
    animState: IWideProjTypes,
    component: React.RefObject<HTMLDivElement | null>
}

export type IWideProjAnimationComponents = {
    contentContainer: IWideProjReferenceTypes,
    homePageImgContainer: IWideProjReferenceTypes,
    githubImgContainer: IWideProjReferenceTypes
}