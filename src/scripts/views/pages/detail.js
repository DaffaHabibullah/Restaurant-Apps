import urlParser from "./../../routes/url-parser";
import RestaurantSource from "../../data/restaurant-source";
import {
    createRestaurantDetailTemplate,
    createAddReviewTemplate,
} from "../templates/template-creator";
import FavoriteButtonInitiator from "../../utils/favorite-button";


const detailPage = {
    async render() {
        return `
        <div id="restaurant" class="container_detail"></div>
        <div id="likeButtonContainer"></div>
        `;
    },

    async afterRender() {
        const url = urlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.detail(url.id);
        const restaurantContainer = document.querySelector("#restaurant");
        restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

        const reviewContainer = document.querySelector(".add_review");
        reviewContainer.innerHTML = createAddReviewTemplate();

        FavoriteButtonInitiator.init({
            favoriteButtonContainer: document.querySelector("#likeButtonContainer"),
            restaurant: {
                id: restaurant.restaurant.id,
                name: restaurant.restaurant.name,
                description: restaurant.restaurant.description,
                pictureId: restaurant.restaurant.pictureId,
                city: restaurant.restaurant.city,
                rating: restaurant.restaurant.rating,
            },
        });
    },
};


export default detailPage;
