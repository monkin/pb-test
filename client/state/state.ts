import { TransactionsState } from "./transactions";
import { CategoriesState } from "./categories";
import { ScreenState } from "./screen";
import { CurrencyState } from "./currency";

export interface AppState {
    categories: CategoriesState;
    currency: CurrencyState,
    transactions: TransactionsState;
    screen: ScreenState;
}