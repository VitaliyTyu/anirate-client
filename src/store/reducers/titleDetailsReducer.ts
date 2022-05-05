import {TitleDetailsVM} from "../../api/api";
//
// const FETCH_TITLE = "FETCH_TITLE"
// const FETCH_TITLE_SUCCESS = "FETCH_TITLE_SUCCESS"
// const FETCH_TITLE_ERROR = "FETCH_TITLE_ERROR"
//
// interface  titleDetailsState {
//     animeTitleDetails: null | TitleDetailsVM;
//     loading: boolean;
//     error: null | boolean;
// }
//
// const initialState: titleDetailsState = {
//     animeTitleDetails: null,
//     loading: false,
//     error: null,
// }
//
// export const titleDetailsReducer = (state = initialState, action): titleDetailsState => {
//     switch (action.type) {
//         case FETCH_TITLE:
//             return {loading: true, error: null, animeTitleDetails: null}
//         case FETCH_TITLE_SUCCESS:
//             return {loading: false, error: null, animeTitleDetails: null}
//         case FETCH_TITLE_ERROR:
//             return {loading: false, error: null, animeTitleDetails: null}
//         default:
//             return state
//     }
// }