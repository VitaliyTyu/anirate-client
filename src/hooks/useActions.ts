import {bindActionCreators} from "redux";
import * as TitlesActionCreators from "../store/actions-creators/titles";
import {useDispatch} from "react-redux";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(TitlesActionCreators, dispatch)
}
// @ts-ignore