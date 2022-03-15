import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_ADDRESSES_FAIL,
  USER_ADDRESSES_REQUEST,
  USER_ADDRESSES_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAIL,
} from "../constants/userConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESSES_REQUEST:
      return { loadingAddress: true, userAddress: [] };
    case USER_ADDRESSES_SUCCESS:
      return { loadingAddress: false, userAddress: action.payload };
    case USER_ADDRESSES_FAIL:
      return { loadingAddress: false, errorAddress: action.payload };
    default:
      return state;
  }
};
export const createUserAddressReducer = (state = {}, action) => {
  const newAddress = action.payload;
  switch (action.type) {
    case CREATE_ADDRESS_REQUEST:
      return { loadingAddress: true };
    case CREATE_ADDRESS_SUCCESS:
      return { loadingAddress: false, userAddress: { ...state.userAddress, newAddress } };
    case CREATE_ADDRESS_FAIL:
      return { loadingAddress: false, errorAddress: action.payload };
    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loadingAddress: true };
    case USER_UPDATE_SUCCESS:
      return { loadingAddress: false, userAddress: action.payload };
    case USER_UPDATE_FAIL:
      return { loadingAddress: false, errorAddress: action.payload };
    default:
      return state;
  }
};
