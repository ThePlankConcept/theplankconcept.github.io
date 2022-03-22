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
        "/api/wishlists",
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

export const getUserWishListAction = () => async (dispatch, getState) => {
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
    dispatch({
      type: WISHLIST_GET_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    const { data } = await axios.get(`/api/wishlists?${query}`, config);
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
        `/api/wishlists/${wishlistid.id}?${query}`,
        { data: { products: usercurrentwishlist } },
        config
      );
      dispatch({
        type: WISHLIST_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch(getUserWishListAction());
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

export const getWishlistBySlug = (slug, userInfo) => async (dispatch) => {
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
    console.log("filter", filter);
    dispatch({
      type: ONE_WISHLIST_GET_REQUEST,
    });
    console.log("user infooo ", userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.userInfo.jwt,
      },
    };
    const { data } = await axios.get(`/api/wishlists?${query}`, config);
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
export const deleteWishlist = (id, userInfo) => async (dispatch) => {
  // let query = "";
  // const populate = {
  //   products: {
  //       populate: {
  //         product_inventories : {
  //           populate :{
  //             images :{
  //               fields: ["formats","url"]
  //             }
  //           }
  //         }
  //       } ,
  //   }
  // };
  // const filter = {
  //     slug: {
  //       $eq: slug
  //     }
  // };
  // query = qs.stringify({
  //   populate: populate,
  //   filters: filter,
  // });
  try {
    // console.log("filter", filter);
    dispatch({
      type: WISHLIST_DEL_REQUEST,
    });
    //  console.log("user infooo ", userInfo)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.userInfo.jwt,
      },
    };
    const { data } = await axios.delete(`/api/wishlists/${id}`, config);
    console.log(data);
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
      console.log(`/api/wishlists/${item.id}`, { data: { products: item.products } });
      promisesp.push(
        axios.put(`/api/wishlists/${item.id}`, { data: { products: item.products } }),
        config
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
    dispatch(getUserWishListAction());
  } catch (error) {
    console.log("hi from catch", error);
    dispatch({
      type: WISHLIST_DEL_ITEM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
