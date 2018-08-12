import { connect } from "react-redux";
import {
    AppState,
    selectBubbles,
    selectCurrency,
    AppDispatch,
    selectActiveCategory,
    selectIsLoadingInProgress,
    selectIsDetailsOpen
} from "../state";
import { Bubbles, BubblesProps } from "../components";
import { loadTransactions } from "../state";

function mapStateToProps(state: AppState) {
    return {
        items: selectBubbles(state),
        currency: selectCurrency(state),
        category: selectActiveCategory(state),
        loading: selectIsLoadingInProgress(state),
        detailsOpen: selectIsDetailsOpen(state)
    };
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        onClick: (category: string) => dispatch(loadTransactions(category))
    };
}

export const BubblesConnected = connect(mapStateToProps, mapDispatchToProps)(Bubbles);