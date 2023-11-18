import drawerInitiator from "../utils/drawer-initiator";
import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";


class App {
    constructor({button, drawer, content}) {
        this._button = button;
        this._drawer = drawer;
        this._content = content;

        this._initialAppShell();
    }

    _initialAppShell() {
        drawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content,
        });
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url];
        if (this._content) {
            this._content.innerHTML = await page.render();
            await page.afterRender();

            const skipLinkElem = document.querySelector(".skip-link");
            const mainContent = document.querySelector("#mainContent");
            if (skipLinkElem && mainContent) {
                skipLinkElem.addEventListener("click", (event) => {
                    event.preventDefault();
                    mainContent.focus();
                });
            } else {
                console.error("Skip link or main content element is missing!");
            }
        } else {
            console.error("Content is null!");
        }
    }
}


export default App;
