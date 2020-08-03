const cartInitialState = {
  cartItems: [],
};

export default function reducer(state = cartInitialState, action) {
  switch (action.type) {
    case "CLIENT_ADD_TO_CART":
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product == item.product);

      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product == product.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case "CLIENT_REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
}
