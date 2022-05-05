import {combineReducers} from "redux";
import {titlesReducer} from "./titlesReducer";


export const rootReducer = combineReducers({
    titles: titlesReducer,
})

export type RootState = ReturnType<typeof rootReducer>