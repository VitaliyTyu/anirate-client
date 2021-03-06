import * as TitlesActionCreators from "./titles";
import * as TitleDetailsActionCreators from "./titleDetails";
import * as CollectionsActionCreators from "./collections";
import * as CollectionDetailsActionCreators from "./collectionDetails";
import * as AuthActionCreators from "./auth";
import * as TitlesFromCollectionActionCreators from "./titlesFromCollection";



export default {
    ...TitleDetailsActionCreators,
    ...TitlesActionCreators,
    ...AuthActionCreators,
    ...CollectionsActionCreators,
    ...CollectionDetailsActionCreators,
    ...TitlesFromCollectionActionCreators,
}
