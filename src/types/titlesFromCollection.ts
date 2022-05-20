import { BriefTitleVM, BriefTitleVMPaginatedList, TitlesListVM } from "../api/api";

export interface TitlesFromCollectionState {
    paginatedList: BriefTitleVMPaginatedList | undefined;
    loading: boolean;
    error: null | string;
    page: number;
}

export enum TitlesFromCollectionActionTypes {
    FETCH_TITLES_FROM_COLLECTION = "FETCH_TITLES_FROM_COLLECTION",
    FETCH_TITLES_FROM_COLLECTION_SUCCESS = "FETCH_TITLES_FROM_COLLECTION_SUCCESS",
    FETCH_TITLES_FROM_COLLECTION_ERROR = "FETCH_TITLES_FROM_COLLECTION_ERROR",
    SET_TITLES_FROM_COLLECTION_PAGE = "SET_TITLES_FROM_COLLECTION_PAGE",
}


export interface FetchTitlesFromCollectionAction {
    type: TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION;
}

export interface FetchTitlesFromCollectionSuccessAction {
    type: TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION_SUCCESS;
    payload: BriefTitleVMPaginatedList | undefined;
}

export interface FetchTitlesFromCollectionErrorAction {
    type: TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION_ERROR;
    payload: string | null;
}

export interface SetTitlesFromCollectionPage {
    type: TitlesFromCollectionActionTypes.SET_TITLES_FROM_COLLECTION_PAGE;
    payload: number;
}

export type TitlesFromCollectionAction = FetchTitlesFromCollectionAction | FetchTitlesFromCollectionSuccessAction | FetchTitlesFromCollectionErrorAction | SetTitlesFromCollectionPage;