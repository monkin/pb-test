import { Action, Store } from "redux";

export interface ScreenState {
    width: number;
    height: number;
}

interface UpdateScreenAction extends Action {
    type: "ResizeScreen",
    width: number;
    height: number;
}

export function updateScreenSize(width = window.innerWidth, height = window.innerHeight): Action {
    return {
        type: "ResizeScreen",
        width, height
    } as UpdateScreenAction;
}

export function screenReducer(state: ScreenState = { width: window.innerWidth, height: window.innerHeight }, action?: UpdateScreenAction): ScreenState {
    if (action && action.type === "ResizeScreen") {
        const { width, height } = action;
        return width !== state.width || height !== state.height
            ?  { width, height }
            : state;
    } else {
        return state;
    }
}

export function listenScreenSize(store: Store) {
    function update() {
        store.dispatch(updateScreenSize())
        setTimeout(() => store.dispatch(updateScreenSize()), 250);
    }
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
}
