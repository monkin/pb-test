import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    AppState,
    selectActiveCategory,
    closeTransactionsDetails,
    selectIsDetailsOpen
} from "../state";
import { Header } from "../components";

function mapStateToProps(state: AppState) {
    return {
        category: selectActiveCategory(state),
        isDetailsOpen: selectIsDetailsOpen(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onBack: () => dispatch(closeTransactionsDetails())
    };
}

export const HeaderConnected = connect(mapStateToProps, mapDispatchToProps)(Header);
