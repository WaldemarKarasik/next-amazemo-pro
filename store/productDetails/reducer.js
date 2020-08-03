const productDetailsInitialState = {
  product: {},
};

export default function reducer(state = productDetailsInitialState, action) {
  switch (action.type) {
    case "PRODUCT_LOADED":
      // console.log(action.payload);
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
}
