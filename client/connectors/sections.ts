import { connect } from "react-redux";
import {
    AppState,
    selectIsDetailsOpen
} from "../state";
import { Section } from "../components";

function mapOverviewSectionProps(state: AppState) {
    return {
        active: !selectIsDetailsOpen(state)
    };
}

export const OverviewSection = connect(mapOverviewSectionProps)(Section);

function mapDetailsSectionProps(state: AppState) {
    return {
        active: selectIsDetailsOpen(state)
    };
}

export const DetailsSection = connect(mapDetailsSectionProps)(Section);
