import {BriefTitleVM} from "../api/api";

export interface  TitlesState {
    titles: BriefTitleVM[] | undefined;
    loading: boolean;
    error: null | string;
    // page: number;
    // limit: number;
}

export enum TitlesActionTypes {
    FETCH_TITLES = "FETCH_TITLE",
    FETCH_TITLES_SUCCESS = "FETCH_TITLE_SUCCESS",
    FETCH_TITLES_ERROR = "FETCH_TITLE_ERROR",
    // FETCH_TITLES_PAGE = "FETCH_TITLE_ERROR",
}

export interface FetchTitlesAction {
    type: TitlesActionTypes.FETCH_TITLES;
}

export interface FetchTitlesSuccessAction {
    type: TitlesActionTypes.FETCH_TITLES_SUCCESS;
    payload: BriefTitleVM[] | undefined;
}

export interface FetchTitlesErrorAction {
    type: TitlesActionTypes.FETCH_TITLES_ERROR;
    payload: string;
}

export type TitlesAction = FetchTitlesAction | FetchTitlesSuccessAction | FetchTitlesErrorAction;