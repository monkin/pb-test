import { Action, Dispatch } from "redux";
import axios from "axios";
import { API_URL } from "../settings";

export interface Category {
    name: string;
    amount: number;
}

export type CategoriesState = Category[];

export interface ReceiveCategoriesAction extends Action {
    type: "ReceiveCategories";
    categories: Category[];
}

export function receiveCategories(categories: Category[]): ReceiveCategoriesAction {
    return { type: "ReceiveCategories", categories };
}

export function loadCategories() {
    return async (dispatch: Dispatch) => {
        dispatch(receiveCategories(
            (await axios.get("/overview", { baseURL: API_URL })).data
        ));
    };
}

export function categoriesReducer(state: CategoriesState = [], action?: ReceiveCategoriesAction) {
    if (action && action.type === "ReceiveCategories") {
        return action.categories;
    } else {
        return state;
    }
}