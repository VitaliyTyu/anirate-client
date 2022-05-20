import { TitlesFromCollectionAction, TitlesFromCollectionActionTypes, TitlesFromCollectionState } from "../../types/titlesFromCollection"

const initialState: TitlesFromCollectionState = {
    paginatedList: undefined,
    loading: false,
    error: null,
    page: 1,
}

export const titlesFromCollectionReducer = (state = initialState, action: TitlesFromCollectionAction): TitlesFromCollectionState => {
    switch (action.type) {
        case TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION:
            return { ...state, loading: true, error: null, }
        case TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION_SUCCESS:
            return { ...state, error: null, loading: false, paginatedList: action.payload }
        case TitlesFromCollectionActionTypes.FETCH_TITLES_FROM_COLLECTION_ERROR:
            return { ...state, loading: false, error: action.payload }
        case TitlesFromCollectionActionTypes.SET_TITLES_FROM_COLLECTION_PAGE:
            return { ...state, loading: false, page: action.payload }
        default:
            return state
    }
}