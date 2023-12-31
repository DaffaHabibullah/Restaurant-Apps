import {openDB} from "idb";
import configAPI from "../global/config";


const {DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME} = configAPI;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, {keyPath: "id"});
    },
});

const favoriteRestaurantIdb = {
    async getRestaurant(id) {
        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },

    async getAllRestaurants() {
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },

    async putRestaurant(restaurant) {
        return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    },

    async deleteRestaurant(id) {
        return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },
};


export default favoriteRestaurantIdb;
