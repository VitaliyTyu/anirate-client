import { TitleDetailsVM } from "../../api/api";
import { TitleDetailsAction, TitleDetailsActionTypes, TitleDetailsState } from "../../types/titleDetails";

const initialState: TitleDetailsState = {
    titleDetails: undefined,
    loading: false,
    error: null,
}

export const titleDetailsReducer = (state = initialState, action: TitleDetailsAction): TitleDetailsState => {
    switch (action.type) {
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS:
            return { ...state, loading: true, error: null }
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS_SUCCESS:
            return { ...state, loading: false, titleDetails: action.payload, error: null }
        case TitleDetailsActionTypes.FETCH_TITLE_DETAILS_ERROR:
            return { ...state, loading: false, error: action.payload }
        // case TitleDetailsActionTypes.SET_CURRENT_TITLE_DETAILS:
        //     return {...state, loading: false, currentId: action.payload, error: null}
        default:
            return state
    }
}