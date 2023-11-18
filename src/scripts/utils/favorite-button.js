import favoriteRestaurantIdb from "../data/favorite-restaurant-idb";
import {createFavoriteButtonTemplate, createUnfavoriteButtonTemplate} from "../views/templates/template-creator";


const FavoriteButtonInitiator = {
    async init({favoriteButtonContainer, restaurant}) {
        this._favoriteButtonContainer = favoriteButtonContainer;
        this._restaurant = restaurant;

        await this._renderButton();
    },

    async _renderButton() {
        const {id} = this._restaurant;

        if (await this._isRestaurantExist(id)) {
            this._renderUnfavorite();
        } else {
            this._renderFavorite();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await favoriteRestaurantIdb.getRestaurant(id);
        return !!restaurant;
    },

    _renderFavorite() {
        this._favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();

        const favoriteButton = document.querySelector("#favorite_button");
        favoriteButton.addEventListener("click", async () => {
            await favoriteRestaurantIdb.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },

    _renderUnfavorite() {
        this._favoriteButtonContainer.innerHTML = createUnfavoriteButtonTemplate();

        const favoriteButton = document.querySelector("#favorite_button");
        favoriteButton.addEventListener("click", async () => {
            await favoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};


export default FavoriteButtonInitiator;
