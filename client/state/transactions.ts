import { Action, Dispatch } from "redux";
import axios from "axios";
import { API_URL } from "../settings";

export interface Transaction {
    id: number;
    category: string;
    description: string;
    time: Date;
    amount: number;
    currency: string;
}

export interface TransactionsState {
    category: string | null;
    loading: boolean;
    closed: boolean;
    transactions: Transaction[];
}

const initialState: TransactionsState = {
    category: null,
    loading: false,
    closed: false,
    transactions: [],
};

interface SetActiveCategoryAction extends Action {
    type: "SetActiveCategory";
    category: string;
}
interface ReceiveTransactionsAction extends Action {
    type: "ReceiveTransactions";
    category: string;
    transactions: Transaction[];
}
interface CloseTransactionsOverviewAction extends Action {
    type: "CloseTransactionsOverview"
}

export type TransactionsAction = SetActiveCategoryAction | ReceiveTransactionsAction | CloseTransactionsOverviewAction;

export function setActiveCategory(category: string): SetActiveCategoryAction {
    return { type: "SetActiveCategory", category };
}
export function closeTransactionsDetails(): CloseTransactionsOverviewAction {
    return { type: "CloseTransactionsOverview" };
}
export function receiveTransactions(category: string, transactions: Transaction[]): ReceiveTransactionsAction {
    return { type: "ReceiveTransactions", category, transactions };
}
export function loadTransactions(category: string) {
    return async (dispatch: Dispatch) => {
        dispatch(setActiveCategory(category));
        dispatch(receiveTransactions(
            category,
            ((await axios.get(`/transactions/${category}`, { baseURL: API_URL })).data as RawTransaction[]).map(parseTransaction)
        ));
    };
}

export function transactionsReducer(state: TransactionsState = initialState, action?: TransactionsAction): TransactionsState {
    if (action) {
        switch (action.type) {
        case "SetActiveCategory":
            if (action.category && action.category !== state.category) {
                return {
                    category: action.category,
                    loading: true,
                    closed: false,
                    transactions: []
                };
            } else {
                return state;
            }
        case "CloseTransactionsOverview":
            return {
                ...state,
                closed: true
            };
        case "ReceiveTransactions":
            if (action.category === state.category) {
                return {
                    category: action.category,
                    loading: false,
                    closed: false,
                    transactions: action.transactions
                };
            } else {
                return state;
            }
        default:
            return state;
        }
    } else {
        return state;
    }
}

// Utilites

interface RawTransaction {
    id: number;
    category: string;
    description: string;
    transactionTime: string;
    amount: string;
    currency: string;
}

function parseTransaction({ transactionTime, amount, ...rest }: RawTransaction): Transaction {
    return {
        ...rest,
        amount: parseFloat(amount),
        time: new Date(Date.parse(transactionTime)),
    };
}
