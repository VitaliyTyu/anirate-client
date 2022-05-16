import { CollectionsAction, CollectionsActionTypes, CollectionsState } from "../../types/collections"

const initialState: CollectionsState = {
    paginatedList: undefined,
    loading: false,
    error: null,
    page: 1,
}

export const collectionsReducer = (state = initialState, action: CollectionsAction): CollectionsState => {
    switch (action.type) {
        case CollectionsActionTypes.FETCH_COLLECTIONS:
            return { ...state, loading: true }
        case CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return { ...state, error: null, loading: false, paginatedList: action.payload }
        case CollectionsActionTypes.FETCH_COLLECTIONS_ERROR:
            return { ...state, loading: false, error: action.payload }
        case CollectionsActionTypes.SET_COLLECTIONS_PAGE:
            return { ...state, loading: false, page: action.payload }
        default:
            return state
    }
}