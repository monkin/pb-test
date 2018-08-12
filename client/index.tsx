import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
    createAppStore,
    listenScreenSize,
    loadCurrency,
    loadCategories
} from "./state";
import {
    BubblesConnected,
    HeaderConnected,
    TransactionsConnected,
    OverviewSection,
    DetailsSection
} from "./connectors";
import { SectionList } from "./components";


require("file-loader?name=[name].[ext]!./index.html");

const store = createAppStore();
listenScreenSize(store);
store.dispatch(loadCurrency());
store.dispatch(loadCategories());

ReactDOM.render(
    <Provider store={store}>
        <>
            <HeaderConnected/>
            <SectionList>
                <OverviewSection>
                    <BubblesConnected/>
                </OverviewSection>
                <DetailsSection>
                    <TransactionsConnected/>
                </DetailsSection>
            </SectionList>
        </>
    </Provider>,
    document.getElementById("root")
);