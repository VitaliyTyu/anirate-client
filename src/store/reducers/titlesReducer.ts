import {TitleDetailsVM} from "../../api/api";
import {TitlesAction, TitlesActionTypes, TitlesState,} from "../../types/titles";

const initialState: TitlesState = {
    titles: [],
    loading: false,
    error: null,
}

export const titlesReducer = (state = initialState, action: TitlesAction): TitlesState => {
    switch (action.type) {
        case TitlesActionTypes.FETCH_TITLES:
            return {loading: true, error: null, titles: []}
        case TitlesActionTypes.FETCH_TITLES_SUCCESS:
            return {loading: false, error: null, titles: action.payload}
        case TitlesActionTypes.FETCH_TITLES_ERROR:
            return {loading: false, error: action.payload, titles: []}
        default:
            return state
    }
}