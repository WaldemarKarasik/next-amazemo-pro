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
    default:
      return state;
  }
}
