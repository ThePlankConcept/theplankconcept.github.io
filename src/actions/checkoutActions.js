import {
  SAVE_CUSTOMER_INFO,
  SAVE_CHECKOUT_DELIVERY_INFO,
  SAVE_CHECKOUT_BILLING_INFO,
  SAVE_PROMO_CODE,
  CREATE_DELIVERY_ADDRESS_REQUEST,
  CREATE_DELIVERY_ADDRESS_FAILURE,
  CREATE_DELIVERY_ADDRESS_SUCCESS,
  CHECKOUT_CART_REQUEST,
  CHECKOUT_CART_SUCCESS,
  CHECKOUT_CART_FAIL,
} from "../constants/checkoutConstants";

import axios from "axios";

export const checkoutCartInfo = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({
      type: CHECKOUT_CART_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    const { data } = await axios.get("/api/carts/getcarts/getall", config);
    console.log("cartincloud", data);
    dispatch({
      type: CHECKOUT_CART_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CHECKOUT_CART_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const saveCustomerInfo =
  ({ firstName, lastName, companyName, useOfFurniture, email, phone }) =>
  (dispatch) => {
    dispatch({
      type: SAVE_CUSTOMER_INFO,
      payload: { firstName, lastName, companyName, useOfFurniture, email, phone },
    });
  };
export const saveDeliveryInfo =
  ({ address, sameBilling }) =>
  (dispatch) => {
    console.log(address);
    dispatch({
      type: SAVE_CHECKOUT_DELIVERY_INFO,
      payload: { address, sameBilling },
    });
  };
export const saveBillingInfo =
  ({ street_name, building_name, flat_number, emirate, area, notes }) =>
  (dispatch) => {
    dispatch({
      type: SAVE_CHECKOUT_BILLING_INFO,
      payload: { street_name, building_name, flat_number, emirate, area, notes },
    });
  };
export const savePromoInfo = (promo) => (dispatch) => {
  dispatch({
    type: SAVE_PROMO_CODE,
    payload: promo,
  });
};

export const createDeliveryAddress =
  ({ street_name, building_name, emirate, notes, flat_number, area }) =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    try {
      console.log("hi from create delivery address");
      dispatch({
        type: CREATE_DELIVERY_ADDRESS_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.jwt,
        },
      };
      const { data } = await axios.post(
        "/api/address/createAddressByUser",
        { data: { street_name, building_name, emirate, notes, flat_number, area } },
        config
      );
      console.log("addresses", data);
      dispatch({
        type: CREATE_DELIVERY_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_DELIVERY_ADDRESS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
