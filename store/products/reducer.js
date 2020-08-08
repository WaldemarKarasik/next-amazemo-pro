const productsInitialState = {
  products: [],
};

export default function reducer(state = productsInitialState, action) {
  switch (action.type) {
    case "PRODUCTS_LOADED":
      // console.log(action.payload);
      return {
        ...state,
        products: action.payload,
      };
    case "REMOVE_PRODUCT":
      console.log(action.payload);
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
