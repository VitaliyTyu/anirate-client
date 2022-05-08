import {BriefTitleVM, BriefTitleVMPaginatedList} from "../api/api";

export interface  TitlesState {
    paginatedList: BriefTitleVMPaginatedList | null;
    loading: boolean;
    error: null | string;
    page: number;
}

export enum TitlesActionTypes {
    FETCH_TITLES = "FETCH_TITLE",
    FETCH_TITLES_SUCCESS = "FETCH_TITLE_SUCCESS",
    FETCH_TITLES_ERROR = "FETCH_TITLE_ERROR",
    SET_TITLES_PAGE = "SET_TITLES_PAGE",
}


export interface FetchTitlesAction {
    type: TitlesActionTypes.FETCH_TITLES;
}

export interface FetchTitlesSuccessAction {
    type: TitlesActionTypes.FETCH_TITLES_SUCCESS;
    payload: BriefTitleVMPaginatedList | null;
}

export interface FetchTitlesErrorAction {
    type: TitlesActionTypes.FETCH_TITLES_ERROR;
    payload: string;
}

export interface SetTitlesPage {
    type: TitlesActionTypes.SET_TITLES_PAGE;
    payload: number;
}

export type TitlesAction = FetchTitlesAction | FetchTitlesSuccessAction | FetchTitlesErrorAction | SetTitlesPage;