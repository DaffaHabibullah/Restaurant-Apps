import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/responsive.css";
import App from "./views/app";
import swRegister from "./utils/sw-register";
import webSoketInit from "./utils/websoket-init";
import configAPI from "./global/config";


const app = new App({
    button: document.querySelector("#hamburgerButton"),
    drawer: document.querySelector("#navigationDrawer"),
    content: document.querySelector("#mainContent"),
});

window.addEventListener("hashchange", () => {
    app.renderPage();
});

window.addEventListener("load", () => {
    app.renderPage();
    swRegister();
    webSoketInit.init(configAPI.WEB_SOCKET_SERVER);
});