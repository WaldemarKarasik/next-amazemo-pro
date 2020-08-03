import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import count from "./count/reducer";
import tick from "./tick/reducer";
import products from "./products/reducer";
import productDetails from "./productDetails/reducer";
import cart from "./cart/reducer";
import { some, isEmpty } from "lodash";
import Cookie from "js-cookie";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  count,
  tick,
  products,
  productDetails,
  cart,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    if (state.products.products.length) nextState.products = state.products;

    if (state.cart.cartItems.length)
      nextState.cart.cartItems = state.cart.cartItems;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const cartItems = Cookie.getJSON("cartItems") || [];
const initialState = { cart: { cartItems } };

const initStore = () => {
  return createStore(reducer, initialState, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
