import favoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import {createRestaurantItemTemplate} from "../templates/template-creator";


const favoritePage = {
    async render() {
        return `
        <h2>Favorite Page</h2>
        <div id="favorite_button_container" class="container_favorite">
            <div id="mainContent" class="container_card_favorite"></div>
        </div>
        `;
    },

    async afterRender() {
        const restaurants = await favoriteRestaurantIdb.getAllRestaurants();
        const restaurantsContainer = document.querySelector(".container_card_favorite");

        if (restaurants.length === 0) {
            restaurantsContainer.innerHTML = `
            <div class="restaurant-item__not__found">
                Tidak ada restaurant untuk ditampilkan
            </div>
            `;
        }

        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
    },
};


export default favoritePage;
