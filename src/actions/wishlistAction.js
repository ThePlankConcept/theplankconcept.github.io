import {
  WISHLIST_CREATE_REQUEST,
  WISHLIST_CREATE_SUCCESS,
  WISHLIST_CREATE_FAIL,
  WISHLIST_GET_REQUEST,
  WISHLIST_GET_SUCCESS,
  WISHLIST_GET_FAIL,
  WISHLIST_UPDATE_REQUEST,
  WISHLIST_UPDATE_SUCCESS,
  WISHLIST_UPDATE_FAIL,
} from "../constants/wishlistConstants";
import axios from "axios";
import qs from "qs";
export const createWishlist =
  ({ name }) =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({
        type: WISHLIST_CREATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.jwt,
        },
      };
      const { data } = await axios.post(
        "http://localhost:1337/api/wishlists",
        { data: { wishlist_name: name, user: userInfo.user.id } },
        config
      );
      console.log("createWish", data);
      dispatch({
        type: WISHLIST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("hi from catch");
      dispatch({
        type: WISHLIST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserWishListAction = (userInfo) => async (dispatch) => {
  let query = "";
  const populate = {
    products: {
      populate: "product_inventories.images",
    },
  };
  const filter = {
    user: {
      id: {
        $eq: userInfo.user.id,
      },
    },
  };
  query = qs.stringify({
    populate: populate,
    filters: filter,
  });
  try {
    dispatch({
      type: WISHLIST_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    const { data } = await axios.get(`http://localhost:1337/api/wishlists?${query}`, config);
    // console.log("getUserWishListAction", data);
    dispatch({
      type: WISHLIST_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("hi from catch");
    dispatch({
      type: WISHLIST_GET_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateuserwishlist =
  ({ product, wishlistid }) =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    let usercurrentwishlist = [product];
    wishlistid.attributes.products.data.map((prod) => {
      usercurrentwishlist.push(prod.id);
    });
    try {
      dispatch({
        type: WISHLIST_UPDATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.jwt,
        },
      };
      const { data } = await axios.put(
        `http://localhost:1337/api/wishlists/${wishlistid.id}`,
        { data: { products: usercurrentwishlist } },
        config
      );
      console.log("updateuserwishlist", data);
      dispatch({
        type: WISHLIST_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("hi from catch");
      dispatch({
        type: WISHLIST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
