import {TitleDetailsVM} from "../../api/api";
import {TitlesAction, TitlesActionTypes, TitlesState,} from "../../types/titles";

const initialState: TitlesState = {
    paginatedList: undefined,
    loading: false,
    error: null,
    page: 1,
}

export const titlesReducer = (state = initialState, action: TitlesAction): TitlesState => {
    switch (action.type) {
        case TitlesActionTypes.FETCH_TITLES:
            return {...state, loading: true}
        case TitlesActionTypes.FETCH_TITLES_SUCCESS:
            return {...state, error: null, loading: false, paginatedList: action.payload}
        case TitlesActionTypes.FETCH_TITLES_ERROR:
            return {...state, loading: false, error: action.payload}
        case TitlesActionTypes.SET_TITLES_PAGE:
            return {...state, loading: false, page: action.payload}
        default:
            return state
    }
}