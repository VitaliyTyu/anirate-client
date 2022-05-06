import {BriefTitleVM, TitleDetailsVM} from "../api/api";

export interface TitleDetailsState {
    titleDetails: null | TitleDetailsVM;
    loading: boolean;
    error: null | string;
}

export enum TitleDetailsActionTypes {
    FETCH_TITLE_DETAILS = "FETCH_TITLE_DETAILS",
    FETCH_TITLE_DETAILS_SUCCESS = "FETCH_TITLE_DETAILS_SUCCESS",
    FETCH_TITLE_DETAILS_ERROR = "FETCH_TITLE_DETAILS_ERROR",
}

export interface FetchTitleDetailsAction {
    type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS;
}

export interface FetchTitleDetailsSuccessAction {
    type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_SUCCESS;
    payload: TitleDetailsVM | null;
}

export interface FetchTitleDetailsErrorAction {
    type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_ERROR;
    payload: string;
}

export type TitleDetailsAction = FetchTitleDetailsAction | FetchTitleDetailsSuccessAction | FetchTitleDetailsErrorAction;