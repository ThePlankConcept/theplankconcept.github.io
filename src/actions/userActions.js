import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_ADDRESSES_FAIL,
  USER_ADDRESSES_REQUEST,
  USER_ADDRESSES_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
} from "../constants/userConstant";

export const facebookLogin = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios({
      method: "GET",
      url: `http://localhost:1337/api/auth/facebook/callback${token}`,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.error.message
          : error.response.data.error.message,
    });
  }
};
export const googleLogin = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios({
      method: "GET",
      url: `http://localhost:1337/api/auth/google/callback?${token}`,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.error.message
          : error.response.data.error.message,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:1337/api/auth/local",
      { identifier: email, password: password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.error.message
          : error.response.data.error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("useraddress");
  localStorage.removeItem("subscribed");
  localStorage.removeItem("purchase");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (fname, lname, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      { first_name: fname, last_name: lname, email: email, password: password },
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.error.message);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.error.message
          : error.response.data.error.message,
    });
  }
};

export const getAddresses = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  console.log("address action");
  try {
    dispatch({
      type: USER_ADDRESSES_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwt,
      },
    };

    const { data } = await axios.get("http://localhost:1337/api/address/addressesByUserId", config);
    dispatch({
      type: USER_ADDRESSES_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem("userAddress", JSON.stringify(data.data));
  } catch (error) {
    console.log("hi from catch");
    dispatch({
      type: USER_ADDRESSES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createAddress =
  ({ street_name, building_name, emirate, notes, flat_number, area }) =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const {
      userAddresses: { userAddress },
    } = getState();

    console.log("useras", userAddress);
    try {
      console.log("hi from create address");
      dispatch({
        type: CREATE_ADDRESS_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.jwt,
        },
      };
      const { data } = await axios.post(
        "http://localhost:1337/api/address/createAddressByUser",
        { data: { street_name, building_name, emirate, notes, flat_number, area } },
        config
      );
      console.log("addresses", data);
      dispatch({
        type: CREATE_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ADDRESS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser = (data1) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    console.log("hi");
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.jwt,
      },
    };
    const { data } = await axios.put(
      "http://localhost:1337/api/users/" + userInfo.user.id,
      data1,
      config
    );
    console.log("addresses", data);
    let x = localStorage.getItem("userInfo");
    console.log("x", userInfo);
    const token = {
      jwt: userInfo.jwt,
      user: data,
    };
    console.log("token", token);
    localStorage.setItem("userInfo", JSON.stringify(token));
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: token,
    });
    // localStorage.setItem("userAddresses", JSON.stringify(data));
  } catch (error) {
    console.log("hi from catch", error);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
