import {BriefTitleVM, TitleDetailsVM} from "../api/api";

export interface TitleDetailsState {
    titleDetails: undefined | TitleDetailsVM;
    loading: boolean;
    error: null | string;
    currentId: string | undefined;
}

export enum TitleDetailsActionTypes {
    FETCH_TITLE_DETAILS = "FETCH_TITLE_DETAILS",
    FETCH_TITLE_DETAILS_SUCCESS = "FETCH_TITLE_DETAILS_SUCCESS",
    FETCH_TITLE_DETAILS_ERROR = "FETCH_TITLE_DETAILS_ERROR",
    SET_CURRENT_TITLE_DETAILS = "SET_CURRENT_TITLE_DETAILS",

}

export interface FetchTitleDetailsAction {
    type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS;
}

export interface FetchTitleDetailsSuccessAction {
    type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_SUCCESS;
    payload: TitleDetailsVM | undefined;
}

export interface FetchTitleDetailsErrorAction {
    type: TitleDetailsActionTypes.FETCH_TITLE_DETAILS_ERROR;
    payload: string;
}

export interface SetCurrentTitleDetailsAction {
    type: TitleDetailsActionTypes.SET_CURRENT_TITLE_DETAILS;
    payload: string | undefined;
}

export type TitleDetailsAction = FetchTitleDetailsAction | FetchTitleDetailsSuccessAction | FetchTitleDetailsErrorAction | SetCurrentTitleDetailsAction;