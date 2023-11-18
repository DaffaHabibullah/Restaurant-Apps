import API_ENDPOINT from "../global/api-endpoint";


class RestaurantSource {
    static async home() {
        const response = await fetch(API_ENDPOINT.HOME);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async detail(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }

    static async addReview(review) {
        const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        });
        return response.json();
    }
}


export default RestaurantSource;
