import {combineReducers} from "redux";
import {titlesReducer} from "./titlesReducer";
import {titleDetailsReducer} from "./titleDetailsReducer";


export const rootReducer = combineReducers({
    titles: titlesReducer,
    titleDetails: titleDetailsReducer,
})

export type RootState = ReturnType<typeof rootReducer>