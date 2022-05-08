import {combineReducers} from "redux";
import {titlesReducer} from "./titlesReducer";
import {titleDetailsReducer} from "./titleDetailsReducer";
import {authReducer} from "./authReducer";


export const rootReducer = combineReducers({
    titles: titlesReducer,
    titleDetails: titleDetailsReducer,
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>