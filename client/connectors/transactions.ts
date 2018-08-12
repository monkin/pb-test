import { connect } from "react-redux";
import {
    AppState,
    selectTransactionsByDay
} from "../state";
import { Transactions } from "../components";

function mapStateToProps(state: AppState) {
    return {
        transactions: selectTransactionsByDay(state)
    };
}

export const TransactionsConnected = connect(mapStateToProps)(Transactions);
