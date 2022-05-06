import {bindActionCreators} from "redux";
import ActionCreators from "../store/actions-creators/index";
import {useDispatch} from "react-redux";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}
