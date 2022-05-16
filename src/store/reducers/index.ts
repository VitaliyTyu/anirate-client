import { combineReducers } from "redux";
import { titlesReducer } from "./titlesReducer";
import { titleDetailsReducer } from "./titleDetailsReducer";
import { authReducer } from "./authReducer";
import { collectionsReducer } from "./collectionsReducer";
import { collectionDetailsReducer } from "./collectionDetails";


export const rootReducer = combineReducers({
    titles: titlesReducer,
    titleDetails: titleDetailsReducer,
    auth: authReducer,
    collections: collectionsReducer,
    collectionDetails: collectionDetailsReducer,
})

export type RootState = ReturnType<typeof rootReducer>