import {
    createStore,
    combineReducers,
    applyMiddleware,
    AnyAction,
    Store
} from "redux";
import reduxThunk, {
    ThunkDispatch
} from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppState } from "./state";
import { transactionsReducer } from "./transactions";
import { categoriesReducer } from "./categories";
import { screenReducer } from "./screen";
import { currencyReducer } from "./currency";

export type AppStore = Store<AppState, AnyAction> & {
    dispatch: ThunkDispatch<AppState, {}, any>;
};

export type AppDispatch = ThunkDispatch<AppState, {}, any>;

export function createAppStore() {
    return createStore(
        combineReducers({
            transactions: transactionsReducer,
            categories: categoriesReducer,
            screen: screenReducer,
            currency: currencyReducer,
        }),
        composeWithDevTools(applyMiddleware(reduxThunk))
    ) as AppStore;
}
