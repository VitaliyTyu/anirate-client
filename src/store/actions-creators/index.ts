import * as TitlesActionCreators from "./titles";
import * as TitleDetailsActionCreators from "./titleDetails";
import * as AuthActionCreators from "./auth";


export default {
    ...TitleDetailsActionCreators,
    ...TitlesActionCreators,
    ...AuthActionCreators,
}
