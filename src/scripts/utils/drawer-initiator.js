const drawerInitiator = {
    init({button, drawer, content}) {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            this._toggleDrawer(event, drawer);
        });

        content.addEventListener("click", (event) => {
            this._closeDrawer(event, drawer);
        });
    },

    _toggleDrawer(event, drawer) {
        drawer.classList.toggle("open");
        event.stopPropagation();
    },

    _closeDrawer(event, drawer) {
        drawer.classList.remove("open");
        event.stopPropagation();
    },
};


export default drawerInitiator;
