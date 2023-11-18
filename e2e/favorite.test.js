Feature("Favorite Restaurant");

Before(({I}) => {
    I.amOnPage("/#/favorite");
});

Scenario("showing empty favorite restaurant", ({I}) => {
    I.seeElement("#mainContent");
    I.see("Tidak ada restaurant untuk ditampilkan", ".restaurant-item__not__found");
});

Scenario("favoriting one restaurant", async ({I}) => {
    I.amOnPage("/");
    I.waitForElement(".card_item a", 10);

    const isElementVisible = await I.seeElement(".card_item a");
    console.log("Is element visible?", isElementVisible);

    const firstRestaurant = locate(".card_item a").first();
    I.click(firstRestaurant);

    I.seeElement("#favorite_button");
    I.click("#favorite_button");

    I.amOnPage("/#/favorite");
    I.seeElement(".card_item a");
});

Scenario("unfavoriting one restaurant", async ({I}) => {
    I.see("Tidak ada restaurant untuk ditampilkan", ".restaurant-item__not__found");

    I.amOnPage("/");

    I.seeElement(".card_item a");
    const firstRestaurant = locate(".card_item a").first();
    I.click(firstRestaurant);

    I.seeElement("#favorite_button");
    I.click("#favorite_button");

    I.amOnPage("/#/favorite");
    I.seeElement(".card_item a");
    const favoritedRestaurant = locate(".card_item a").first();
    // const favoritedRestaurantTitle = await I.grabTextFrom(favoritedRestaurant);
    I.click(favoritedRestaurant);

    I.seeElement("#favorite_button");
    I.click("#favorite_button");

    I.amOnPage("/#/favorite");
    I.see("Tidak ada restaurant untuk ditampilkan", ".restaurant-item__not__found");
});
