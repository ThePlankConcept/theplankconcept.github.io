import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const addToCart = (slug, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/product/${slug}`);
  console.log("cart", { ...data.data }, qty);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.data[0].attributes.product_name,
      name: data.data[0].attributes.product_name,
      image: data.data[0].attributes.product_inventories.data[0].attributes.images.data[0].attributes.formats.thumbnail.url,
      price: data.data[0].attributes.price,
      countInStock: data.data[0].attributes.product_inventories.data[0].attributes.quantity,
      category: data.data[0].attributes.categories.data[0].id,
      slug: slug,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
