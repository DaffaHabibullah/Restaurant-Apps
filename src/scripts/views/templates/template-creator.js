import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import configAPI from "../../global/config";


const createRestaurantItemTemplate = (restaurant) => `
<div class="card_item">
    <div class="card_image">
        <picture>
            <source media="(max-width: 600px)" data-srcset="${configAPI.BASE_IMAGE_URL + restaurant.pictureId}">
            <img crossorigin="anonymous" class="lazyload" data-src="${configAPI.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
        </picture>
    </div>

    <div id="mainContent" class="card_content">
        <div class="card_header">
            <a href="#/detail/${restaurant.id}"><h3 class="card_title">${restaurant.name}</h3></a>
            <p class="card_rating">⭐️<span>${restaurant.rating}</span></p>
        </div>

        <p class="card_city">${restaurant.city}</p>

        <div class="card_description">
            <p>${restaurant.description}</p>
        </div>
    </div>

    <div class="card_footer">
        <a href="#/detail/${restaurant.id}">Detail ></a>
    </div>
</div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
<div id="mainContent" class="detail">
    <div class="detail_image">
        <picture>
            <source media="(max-width: 600px)" data-srcset="${configAPI.BASE_IMAGE_URL + restaurant.pictureId}">
            <img crossorigin="anonymous" class="lazyload" data-src="${configAPI.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
        </picture>
    </div>

    <div class="detail_content">
        <hr>

        <div class="detail_header">
            <h2 class="detail_title">${restaurant.name}</h2>
            <p class="detail_rating">Rating: <span>⭐️${restaurant.rating}</span></p>
        </div>

        <div class="detail_info">
            <p class="detail_address">Address: ${restaurant.address}</p>
            <p class="detail_city">City: ${restaurant.city}</p>
        </div>

        <div class="detail_description">
            <p>${restaurant.description}</p>
        </div>

        <div class="detail_categories">

            <div class="container_menus">
                <h2>Menus</h2>

                <div class="detail_menus">
                    <div>
                    <h3>Foods</h3>
                    <div class="detail_foods">
                            <ul>
                                ${restaurant.menus.foods.map((food) => `
                                    <li>${food.name}</li>
                                `).join("")}
                            </ul>
                        </div>
                    </div>

                    <div>
                    <h3>Drinks</h3>
                    <div class="detail_drinks">
                            <ul>
                                ${restaurant.menus.drinks.map((drink) => `
                                    <li>${drink.name}</li>
                                `).join("")}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container_reviews">
                <h3>Customer Reviews: </h3>
                <div class="detail_reviews">
                    <ul class="detail_unlist">
                        ${restaurant.customerReviews.map((review) => `
                            <li class="reviews_list">
                                <div class="review_header">
                                    <p class="review_name">${review.name}</p>
                                    <p class="review_date">${review.date}</p>
                                </div>
                                <div class="review_review">
                                <hr>
                                <p>${review.review}</p>
                                </div>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            </div>

            <div class="add_review">
            </div>
            
        </div>
    </div>
</div>
`;

const createAddReviewTemplate = () => `
<div>
    <h2>Add Review</h2>
    <form id="add_review_form" class="add_review_form">
        <input class="input_review_name" type="text" name="name" id="name" placeholder="Name" required/>
        <textarea class="input_review" name="review" id="review" placeholder="Review" required></textarea>
        <button type="submit">Submit</button>
    </form>
</div>
`;

const createFavoriteButtonTemplate = () => `
<button aria-label="favorite this restaurant" id="favorite_button" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
</button>
`;

const createUnfavoriteButtonTemplate = () => `
<button aria-label="unfavorite this restaurant" id="favorite_button" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
</button>
`;


export {
    createRestaurantItemTemplate,
    createRestaurantDetailTemplate,
    createAddReviewTemplate,
    createFavoriteButtonTemplate,
    createUnfavoriteButtonTemplate,
};
