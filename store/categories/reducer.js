const initialCategoriesState = {
  categories: [],
};

export default (state = initialCategoriesState, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};
