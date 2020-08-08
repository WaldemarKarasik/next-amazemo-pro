import Axios from "axios";
import React from "react";
export const useDeleteProduct = (dispatch, router) => {
  return async (id) => {
    const { data } = await Axios.post(`/api/remove-product?id=${id}`);
    dispatch({ type: "REMOVE_PRODUCT", payload: data.product._id });
    dispatch({ type: "SET_CATEGORIES", payload: data.categories });
    router.push("/");
  };
};

export const useAlreadyInCart = (cartItems, product) => {
  const [alreadyInCart, setAlreadyInCart] = React.useState(false);
  React.useEffect(() => {
    const found = cartItems.some((item) => item.product == product._id);
    if (found) {
      setAlreadyInCart(true);
    }
  }, [cartItems]);
  return alreadyInCart;
};
