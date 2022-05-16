import { BriefCollectionVMPaginatedList } from "../api/api";

export interface CollectionsState {
    paginatedList: BriefCollectionVMPaginatedList | undefined;
    loading: boolean;
    error: null | string;
    page: number;
}

export enum CollectionsActionTypes {
    FETCH_COLLECTIONS = "FETCH_COLLECTIONS",
    FETCH_COLLECTIONS_SUCCESS = "FETCH_COLLECTIONS_SUCCESS",
    FETCH_COLLECTIONS_ERROR = "FETCH_COLLECTIONS_ERROR",
    SET_COLLECTIONS_PAGE = "SET_COLLECTIONS_PAGE",
}


export interface FetchCollectionsAction {
    type: CollectionsActionTypes.FETCH_COLLECTIONS;
}

export interface FetchCollectionsSuccessAction {
    type: CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS;
    payload: BriefCollectionVMPaginatedList | undefined;
}

export interface FetchCollectionsErrorAction {
    type: CollectionsActionTypes.FETCH_COLLECTIONS_ERROR;
    payload: string | null;
}

export interface SetCollectionsPage {
    type: CollectionsActionTypes.SET_COLLECTIONS_PAGE;
    payload: number;
}

export type CollectionsAction = FetchCollectionsAction | FetchCollectionsSuccessAction | FetchCollectionsErrorAction | SetCollectionsPage;