import { CollectionDetailsAction, CollectionDetailsActionTypes, CollectionDetailsState } from "../../types/collectionDetails"

const initialState: CollectionDetailsState = {
    collectionDetails: undefined,
    loading: false,
    error: null,
    currentId: undefined,
}

export const collectionDetailsReducer = (state = initialState, action: CollectionDetailsAction): CollectionDetailsState => {
    switch (action.type) {
        case CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS:
            return { ...state, loading: true, error: null }
        case CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS_SUCCESS:
            return { ...state, loading: false, collectionDetails: action.payload, error: null }
        case CollectionDetailsActionTypes.FETCH_COLLECTION_DETAILS_ERROR:
            return { ...state, loading: false, error: action.payload }
        case CollectionDetailsActionTypes.SET_CURRENT_COLLECTION_DETAILS:
            return { ...state, loading: false, currentId: action.payload, error: null }
        default:
            return state
    }
}