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
} from "../constants/userConstant";

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

    const { data } = await axios.post("http://localhost:1337/api/auth/local", { "identifier": email,  "password" : password }, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.error.message : error.response.data.error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (fname ,lname, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("http://localhost:1337/api/auth/local/register", { first_name:fname, last_name:lname,email: email,password: password }, config);
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
    console.log(error.response.data.error.message)
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.error.message : error.response.data.error.message,
    });
  }
};

export const getAddresses = (jwt) => async (dispatch) => {
  try {
    console.log("hi")
    dispatch({
      type: USER_ADDRESSES_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer "+jwt
      },
    };

    const { data } = await axios.get("http://localhost:1337/api/address/addressesByUserId",config);
    console.log("addresses", data)
    dispatch({
      type: USER_ADDRESSES_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_ADDRESSES_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userAddresses", JSON.stringify(data));
  } catch (error) {
    console.log("hi from catch")
    dispatch({
      type: USER_ADDRESSES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createAddress = (jwt,data1) => async (dispatch) => {
  try {
    console.log("hi from create address")
    dispatch({
      type: CREATE_ADDRESS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer "+jwt
      },
    };

    const { data } = await axios.post("http://localhost:1337/api/address/createAddressByUser",data1,config);
    console.log("addresses", data)
    dispatch({
      type: CREATE_ADDRESS_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CREATE_ADDRESS_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userAddresses", JSON.stringify(data));
  } catch (error) {
    console.log("hi from catch")
    dispatch({
      type: CREATE_ADDRESS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};