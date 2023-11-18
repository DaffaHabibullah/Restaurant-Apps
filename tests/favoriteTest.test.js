import FavoriteButtonInitiator from "../src/scripts/utils/favorite-button";
import favoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Favorite A Restaurant", () => {
    const addFavoriteButtonContainer = () => {
        document.body.innerHTML = "<div id=\"favorite_button_container\"></div>";
    };

    beforeEach(() => {
        addFavoriteButtonContainer();
    });

    afterEach(async () => {
        await favoriteRestaurantIdb.deleteRestaurant(1);
    });

    it("should show the favorite button when the restaurant has not been favorited before", async () => {
        await FavoriteButtonInitiator.init({
            favoriteButtonContainer: document.querySelector("#favorite_button_container"),
            restaurant: {id: 1},
        });

        expect(document.querySelector("[aria-label='favorite this restaurant']")).toBeTruthy();
        expect(document.querySelector("[aria-label='unfavorite this restaurant']")).toBeFalsy();
    });

    it("should be able to favorite the restaurant", async () => {
        await FavoriteButtonInitiator.init({
            favoriteButtonContainer: document.querySelector("#favorite_button_container"),
            restaurant: {id: 1},
        });

        const favoriteButton = document.querySelector("#favorite_button");
        favoriteButton.dispatchEvent(new Event("click"));

        const restaurant = await favoriteRestaurantIdb.getRestaurant(1);
        expect(restaurant).toEqual({id: 1});
    });

    it("should not add a restaurant again when it's already favorited", async () => {
        await FavoriteButtonInitiator.init({
            favoriteButtonContainer: document.querySelector("#favorite_button_container"),
            restaurant: {id: 1},
        });

        await favoriteRestaurantIdb.putRestaurant({id: 1});

        const favoriteButton = document.querySelector("#favorite_button");
        favoriteButton.dispatchEvent(new Event("click"));

        const restaurants = await favoriteRestaurantIdb.getAllRestaurants();
        expect(restaurants).toEqual([{id: 1}]);
    });

    it("should show the unfavorite button when the restaurant has been favorited", async () => {
        await favoriteRestaurantIdb.putRestaurant({id: 1});

        await FavoriteButtonInitiator.init({
            favoriteButtonContainer: document.querySelector("#favorite_button_container"),
            restaurant: {id: 1},
        });

        expect(document.querySelector("[aria-label='unfavorite this restaurant']")).toBeTruthy();
        expect(document.querySelector("[aria-label='favorite this restaurant']")).toBeFalsy();
    });

    it("should be able to remove favorited restaurant from the list", async () => {
        await favoriteRestaurantIdb.putRestaurant({id: 1});

        await FavoriteButtonInitiator.init({
            favoriteButtonContainer: document.querySelector("#favorite_button_container"),
            restaurant: {id: 1},
        });

        const unfavoriteButton = document.querySelector("[aria-label='unfavorite this restaurant']");
        if (unfavoriteButton) {
            unfavoriteButton.dispatchEvent(new Event("click"));
        }

        const restaurants = await favoriteRestaurantIdb.getAllRestaurants();
        expect(restaurants).toEqual([]);
    });

    it("should not throw error if the unfavorited restaurant is not in the list", async () => {
        await FavoriteButtonInitiator.init({
            favoriteButtonContainer: document.querySelector("#favorite_button_container"),
            restaurant: {id: 1},
        });

        await favoriteRestaurantIdb.deleteRestaurant(1);

        const unfavoriteButton = document.querySelector("[aria-label='unfavorite this restaurant']");
        if (unfavoriteButton) {
            unfavoriteButton.dispatchEvent(new Event("click"));
        }

        const restaurants = await favoriteRestaurantIdb.getAllRestaurants();
        expect(restaurants).toEqual([]);
    });
});
