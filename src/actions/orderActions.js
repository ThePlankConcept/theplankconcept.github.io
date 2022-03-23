import axios from "axios";
import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_POPULATED_ORDER_FAIL,
  GET_POPULATED_ORDER_REQUEST,
  GET_POPULATED_ORDER_SUCCESS,
} from "../constants/orderConstant";
import qs from "qs";
export const getOrderById = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    console.log("hi");
    dispatch({
      type: GET_POPULATED_ORDER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    // const filter = {

    //   categories: {
    //         id:{
    //           $eq: category,
    //         }

    //   }

    // }
    const populate = {
      order_items: {
        populate: {
          product_inventories: {
            populate: {
              product: {
                populate: {
                  images: {
                    fields: ["url"],
                  },
                },
              },
            },
          },
        },
      },
    };
    const query = qs.stringify({
      populate: populate,
    });
    const { data } = await axios.get(
      "https://plank-strapi.herokuapp.com/api/orders/orderById/" + id,
      config
    );
    console.log("orders populated", data);
    //   let x = localStorage.getItem("userInfo")
    //   console.log("x" , userInfo)

    //     const token = {
    //       jwt : userInfo.jwt ,
    //       user : data
    //   }
    //     console.log("token", token)
    // localStorage.setItem("userInfo", JSON.stringify(token));
    dispatch({
      type: GET_POPULATED_ORDER_SUCCESS,
      payload: data,
    });

    //   dispatch({
    //     type: GET_ORDER_FAIL,
    //     payload: token,
    //   });

    // localStorage.setItem("userAddresses", JSON.stringify(data));
  } catch (error) {
    console.log("hi from catch", error);
    dispatch({
      type: GET_POPULATED_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrderByUser = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    console.log("hi");
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwt,
      },
    };

    const { data } = await axios.get(
      "https://plank-strapi.herokuapp.com/api/orders/user/" + id,
      config
    );
    console.log("orders", data);
    //   let x = localStorage.getItem("userInfo")
    //   console.log("x" , userInfo)

    //     const token = {
    //       jwt : userInfo.jwt ,
    //       user : data
    //   }
    //     console.log("token", token)
    // localStorage.setItem("userInfo", JSON.stringify(token));
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });

    //   dispatch({
    //     type: GET_ORDER_FAIL,
    //     payload: token,
    //   });

    // localStorage.setItem("userAddresses", JSON.stringify(data));
  } catch (error) {
    console.log("hi from catch", error);
    dispatch({
      type: GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
