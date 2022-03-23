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
  WISHLIST_DEL_REQUEST,
  WISHLIST_DEL_SUCCESS,
  WISHLIST_DEL_FAIL,
  ONE_WISHLIST_GET_REQUEST,
  ONE_WISHLIST_GET_SUCCESS,
  ONE_WISHLIST_GET_FAIL,
  WISHLIST_DEL_ITEM_REQUEST,
  WISHLIST_DEL_ITEM_SUCCESS,
  WISHLIST_DEL_ITEM_FAIL,
  WISHLIST_DEL_ITEM_FROM_WISHLIST_REQUEST,
  WISHLIST_DEL_ITEM_FROM_WISHLIST_SUCCESS,
  WISHLIST_DEL_ITEM_FROM_WISHLIST_FAIL,
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
        "https://plank-strapi.herokuapp.com/api/wishlists",
        { data: { wishlist_name: name, user: userInfo.user.id } },
        config
      );

      dispatch({
        type: WISHLIST_CREATE_SUCCESS,
        payload: data,
      });
      dispatch(getUserWishListAction());
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

export const getUserWishListAction = (path) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    let query = "";
    const populate = {
      products: {
        populate: "product_inventories.images",
      },
    };
    const populate1 = {
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

    if (path === "wishlist") {
      query = qs.stringify({
        populate: populate,
        filters: filter,
      });
    } else {
      query = qs.stringify({
        populate: populate1,
        filters: filter,
      });
    }

    dispatch({
      type: WISHLIST_GET_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    const { data } = await axios.get(
      `https://plank-strapi.herokuapp.com/api/wishlists?${query}`,
      config
    );
    console.log("getUserWishListAction", data);
    dispatch({
      type: WISHLIST_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("hi from catch", error);
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

    try {
      let query = "";
      const populate = {
        products: {
          populate: "product_inventories.images",
        },
      };

      query = qs.stringify({
        populate: populate,
      });
      let usercurrentwishlist = [product];
      console.log(wishlistid);
      wishlistid.attributes.products.data.map((prod) => {
        usercurrentwishlist.push(prod.id);
      });
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
        `https://plank-strapi.herokuapp.com/api/wishlists/${wishlistid.id}?${query}`,
        { data: { products: usercurrentwishlist } },
        config
      );
      dispatch({
        type: WISHLIST_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch(getUserWishListAction("products"));
    } catch (error) {
      console.log("hi from catch", error);
      dispatch({
        type: WISHLIST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getWishlistBySlug = (slug, userInfo) => async (dispatch, getState) => {
  let query = "";
  const populate = {
    products: {
      populate: {
        product_inventories: {
          populate: {
            images: {
              fields: ["formats", "url"],
            },
          },
        },
      },
    },
  };
  const filter = {
    slug: {
      $eq: slug,
    },
  };
  query = qs.stringify({
    populate: populate,
    filters: filter,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    console.log("filter", filter);
    dispatch({
      type: ONE_WISHLIST_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    const { data } = await axios.get(
      `https://plank-strapi.herokuapp.com/api/wishlists?${query}`,
      config
    );
    console.log("r", data);
    dispatch({
      type: ONE_WISHLIST_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("hi from catch");
    dispatch({
      type: ONE_WISHLIST_GET_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const deleteWishlist = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: WISHLIST_DEL_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    const { data } = await axios.delete(
      `https://plank-strapi.herokuapp.com/api/wishlists/${id}`,
      config
    );
    dispatch(getUserWishListAction("wishlist"));
    dispatch({
      type: WISHLIST_DEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("hi from catch");
    dispatch({
      type: WISHLIST_DEL_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const removeItemFromWishlist = (pid) => async (dispatch, getState) => {
  try {
    let query = "";
    const {
      userLogin: { userInfo },
      getUserWishlist: { userWishList },
    } = getState();
    dispatch({
      type: WISHLIST_DEL_ITEM_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.jwt,
      },
    };

    console.log("getUserWishListAction", userWishList);
    let newWishlist = [];
    userWishList.data.map((wishlist, index) => {
      let wishlistId = wishlist.id;
      const p = wishlist.attributes.products.data.filter((p) => p.id !== pid);

      newWishlist.push({ id: wishlistId, products: p.map((item) => item.id) });
    });
    let promisesp = [];
    newWishlist.map((item) => {
      promisesp.push(
        axios.put(
          `https://plank-strapi.herokuapp.comhttps://plank-strapi.herokuapp.com/api/wishlists/${item.id}`,
          {
            data: { products: item.products },
          },
          config
        )
      );
    });

    axios.all(promisesp.map((promise) => promise)).then(
      axios.spread((response) => {
        dispatch({
          type: WISHLIST_DEL_ITEM_SUCCESS,
          payload: { success: true },
        });
      })
    );
    dispatch(getUserWishListAction("products"));
  } catch (error) {
    console.log("hi from catch", error);
    dispatch({
      type: WISHLIST_DEL_ITEM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const removeItemFromWishlist2 = (pid, wishlistId) => async (dispatch, getState) => {
  try {
    let query = "";
    const {
      userLogin: { userInfo },
      getWishlistBySlugReducer: { wishlist },
    } = getState();
    console.log("sss", wishlist);
    dispatch({
      type: WISHLIST_DEL_ITEM_FROM_WISHLIST_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.jwt,
      },
    };

    const p = wishlist.data[0].attributes.products.data.filter((p) => p.id !== pid);

    const { data } = await axios.put(
      `https://plank-strapi.herokuapp.com/api/wishlists/${wishlistId}`,
      {
        data: { products: p.map((item) => item.id) },
      },
      config
    );
    console.log("response", data);
    dispatch(getWishlistBySlug(wishlist.data[0].attributes.slug));
    dispatch(getUserWishListAction("products"));
  } catch (error) {
    console.log("hi from catch", error);
    dispatch({
      type: WISHLIST_DEL_ITEM_FROM_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
