import { CollectionDetailsVM } from "../api/api";

export interface CollectionDetailsState {
    collectionDetails: undefined | CollectionDetailsVM;
    loading: boolean;
    error: null | string;
    currentId: string | undefined;
}

export enum CollectionDetailsActionTypes {
    FETCH_COLLECTION_DETAILS = "FETCH_COLLECTION_DETAILS",
    FETCH_COLLECTION_DETAILS_SUCCESS = "FETCH_COLLECTION_DETAILS_SUCCESS",
    FETCH_COLLECTION_DETAILS_ERROR = "FETCH_COLLECTIONDETAILS_ERROR",
    SET_CURRENT_COLLECTION_DETAILS = "SET_CURRENT_COLLECTION_DETAILS",

}

export interface FetchCollectionDetailsAction {
    type: CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS;
}

export interface FetchCollectionDetailsSuccessAction {
    type: CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS_SUCCESS;
    payload: CollectionDetailsVM | undefined;
}

export interface FetchCollectionDetailsErrorAction {
    type: CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS_ERROR;
    payload: string;
}

export interface SetCurrentCollectionDetailsAction {
    type: CollectionDetailsActionTypes.SET_CURRENT_COLLECTION_DETAILS;
    payload: string | undefined;
}

export type CollectionDetailsAction = FetchCollectionDetailsAction | FetchCollectionDetailsSuccessAction | FetchCollectionDetailsErrorAction | SetCurrentCollectionDetailsAction;