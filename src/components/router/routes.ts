import AnimeList from "../AnimeList"
import ExactAnimePage from "../pages/ExactAnimePage/ExactAnimePage"
import StartPage from "../pages/StartPage"

export const publicRoutes = [
    { path: "/", component: StartPage },
    { path: "/animes", component: AnimeList },
    { path: "/animes/:id", component: ExactAnimePage, exact: true },
]

export const privateRoutes = [
    { path: "/", component: StartPage },
    { path: "/animes", component: AnimeList },
    { path: "/animes/:id", component: ExactAnimePage, exact: true },
]