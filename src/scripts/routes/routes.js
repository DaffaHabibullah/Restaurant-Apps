import homePage from "../views/pages/home";
import detailPage from "../views/pages/detail";
import favoritePage from "../views/pages/favorite";


const routes = {
    "/": homePage,
    "/home": homePage,
    "/favorite": favoritePage,
    "/detail/:id": detailPage,
};


export default routes;
