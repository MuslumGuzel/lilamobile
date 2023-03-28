
import { icons, images, SIZES, COLORS, FONTS } from '.';
export const categoryData = [
    {
        id: 1,
        name: "Rice",
        icon: icons.rice_bowl,
    },
    {
        id: 2,
        name: "Noodles",
        icon: icons.noodle,
    },
    {
        id: 3,
        name: "Hot Dogs",
        icon: icons.hotdog,
    },
    {
        id: 4,
        name: "Salads",
        icon: icons.salad,
    },
    {
        id: 5,
        name: "Burgers",
        icon: icons.hamburger,
    },
    {
        id: 6,
        name: "Pizza",
        icon: icons.pizza,
    },
    {
        id: 7,
        name: "Snacks",
        icon: icons.fries,
    },
    {
        id: 8,
        name: "Sushi",
        icon: icons.sushi,
    },
    {
        id: 9,
        name: "Desserts",
        icon: icons.donut,
    },
    {
        id: 10,
        name: "Drinks",
        icon: icons.drink,
    },
];

export const foodData = [
    {
        id: 1,
        name: "ByProgrammers Burger",
        categories: [5, 7],
        photo: images.burger_restaurant_1,

    },
    {
        id: 2,
        name: "ByProgrammers Pizza",
        categories: [2, 4, 6],
        photo: images.pizza_restaurant,
    },
    {
        id: 3,
        name: "ByProgrammers Hotdogs",
        categories: [3],
        photo: images.hot_dog_restaurant,
    },
    {
        id: 4,
        name: "ByProgrammers Sushi",
        categories: [8],
        photo: images.japanese_restaurant,
    },
    {
        id: 5,
        name: "ByProgrammers Cuisine",
        categories: [1, 2],
        photo: images.noodle_shop,
    },
    {

        id: 6,
        name: "ByProgrammers Dessets",
        categories: [9, 10],
        photo: images.kek_lapis_shop,

    }
];