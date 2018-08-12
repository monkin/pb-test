import { Action, Dispatch } from "redux";
import axios from "axios";
import { API_URL } from "../settings";

export type CurrencyState = string | null;

interface SetCurrencyAction extends Action {
    type: "SetCurrency",
    currency: string;
}

export function setCurrency(currency: string): SetCurrencyAction {
    return { type: "SetCurrency", currency };
}

export function loadCurrency() {
    return async (dispatch: Dispatch) => {
        dispatch(setCurrency(
            (await axios.get("/currency", { baseURL: API_URL })).data
        ));
    };
}

export function currencyReducer(state: CurrencyState = null, action?: SetCurrencyAction) {
    return action && action.type === "SetCurrency" ? action.currency : state;
}