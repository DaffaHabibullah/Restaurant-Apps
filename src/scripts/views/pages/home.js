import RestaurantSource from "../../data/restaurant-source";
import {createRestaurantItemTemplate} from "../templates/template-creator";


const homePage = {
    async render() {
        return `
          <div class="container_hero">
            <div class="hero_title">
              <h1>Welcome to Daffa Resto</h1>
              <p>Cari tempat makan dengan mudah disini saja!</p>
            </div>
          </div>

          <div id="main_resto" class="container_explore">
            <h2>Explore Restaurant</h2>

            <div class="container_card">
              <div id="restaurants" class="container_card"></div>
            </div>
          </div>
        `;
    },

    async afterRender() {
        const restaurants = await RestaurantSource.home();
        const restaurantsContainer = document.querySelector("#restaurants");
        console.log(restaurants);
        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        },
        );
    },
};


export default homePage;
