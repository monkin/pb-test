
import { createSelector } from "reselect";
import { AppState } from "./state";
import { initialDistribution, improoveDistribution } from "./bubbles";
import { Transaction } from "./transactions";
import { transactions } from "../../server/data";

export const selectTransactions = (state: AppState) => state.transactions;
export const selectCategories = (state: AppState) => state.categories;
export const selectScreen = (state: AppState) => state.screen;
export const selectCurrency = (state: AppState) => state.currency;


export const selectPageWidth = createSelector(
    selectScreen,
    ({ width }) => Math.max(300, Math.min(width, 900))
);

export const selectBubbles = createSelector(
    selectCategories, selectPageWidth,
    (categories, pageWidth) => {
        let distribution = initialDistribution(categories, pageWidth);
        for (let i = 0; i < 50; i++) {
            distribution = improoveDistribution(distribution, pageWidth);
        }
        return distribution;
    }
);

export const selectTransactionList = createSelector(
    selectTransactions,
    transactions => transactions.transactions
);

function pad2(v: number) {
    return v < 10 ? `0${v}` : v.toFixed();
}

export const selectTransactionsByDay = createSelector(
    selectTransactionList,
    transactions => transactions.reduce((r, transaction) => {
        const { time } = transaction,
            date = `${time.getFullYear()}${pad2(time.getMonth() + 1)}${pad2(time.getDate())}`;
        if (r.has(date)) {
            r.get(date)!.push(transaction);
        } else {
            r.set(date, [transaction]);
        }
        return r;
    }, new Map<string, Transaction[]>())
);

export const selectActiveCategory = createSelector(
    selectTransactions,
    transactions => transactions.category
);

export const selectIsTransactionsLoading = createSelector(
    selectTransactions,
    transactions => transactions.loading
);

export const selectIsDetailsOpen = createSelector(
    selectTransactions,
    transactions => !transactions.loading
        && !transactions.closed
        && transactions.category !== null
);

export const selectIsLoadingInProgress = createSelector(
    selectTransactions,
    transactions => transactions.loading
)
