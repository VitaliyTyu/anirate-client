import AnimesPage from "../components/pages/AnimesPage/AnimesPage"
import CollectionsPage from "../components/pages/CollectionsPage/CollectionsPage"
import ExactAnimePage from "../components/pages/ExactAnimePage/ExactAnimePage"
import ExactCollectionPage from "../components/pages/ExactCollectionPage/ExactCollectionPage"
import LoginPage from "../components/pages/LoginPage/LoginPage"
import StartPage from "../components/pages/StartPage/StartPage"

export const publicRoutes = [
    { path: "/", component: StartPage },
    { path: "/animes", component: AnimesPage },
    { path: "/animes/:id", component: ExactAnimePage },
    { path: "/login", component: LoginPage },
]

export const privateRoutes = [
    { path: "/", component: StartPage },
    { path: "/animes", component: AnimesPage },
    { path: "/animes/:id", component: ExactAnimePage },
    { path: "/collections", component: CollectionsPage },
    { path: "/collections/:id", component: ExactCollectionPage },
]