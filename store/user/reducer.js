const userInitialState = {
  user: {},
  isAuthenticated: false,
};

export default function reducer(state = userInitialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
