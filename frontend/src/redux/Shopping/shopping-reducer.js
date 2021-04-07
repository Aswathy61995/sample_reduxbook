import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Shelock Holmes",
      description:
        "Sherlock Holmes is a fictional private detective created by British author Sir Arthur Conan Doyle. Referring to himself as a consulting detective in the stories, Holmes is known for his proficiency.",
      price: 115.0,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/41tT5SJp6+L._SX321_BO1,204,203,200_.jpg"
    },
    {
      id: 2,
      title: "War and peace",
      description:
        "War and Peace is a novel by the Russian author Leo Tolstoy, first published serially, then published in its entirety in 1869. It is regarded as one of Tolstoy's finest literary achievements and remains an internationally praised classic of world literature",
      price: 200.0,
      image:
        "https://images4.penguinrandomhouse.com/cover/9781400079988",
    },
    {
      id: 3,
      title: "The lord of the kings",
      description:
        "These books will keep you busy all throughout the entire lockdown and give you some great advise from famous people",
      price: 150.0,
      image:
        "https://cdn.lifehack.org/wp-content/uploads/2015/03/9780618640157_custom-s6-c30.jpg",
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
