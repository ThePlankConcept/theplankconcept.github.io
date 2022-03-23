import {
  SAVE_CUSTOMER_INFO,
  SAVE_CHECKOUT_DELIVERY_INFO,
  SAVE_CHECKOUT_BILLING_INFO,
  SAVE_PROMO_CODE,
  CREATE_DELIVERY_ADDRESS_REQUEST,
  CREATE_DELIVERY_ADDRESS_SUCCESS,
  CREATE_DELIVERY_ADDRESS_FAILURE,
  CHECKOUT_CART_FAIL,
  CHECKOUT_CART_SUCCESS,
  CHECKOUT_CART_REQUEST,
} from "../constants/checkoutConstants";

export const checkoutDetailsReducer = (
  state = { promoInfo: "", customerInfo: {}, checkoutDeliveryInfo: {}, checkoutBillingInfo: {} },
  action
) => {
  switch (action.type) {
    case SAVE_PROMO_CODE:
      return {
        ...state,
        promoInfo: action.payload,
      };
    case SAVE_CUSTOMER_INFO:
      return {
        ...state,
        customerInfo: action.payload,
      };
    case SAVE_CHECKOUT_DELIVERY_INFO:
      return {
        ...state,
        checkoutDeliveryInfo: action.payload,
      };
    case SAVE_CHECKOUT_BILLING_INFO:
      return {
        ...state,
        checkoutBillingInfo: action.payload,
      };
    default:
      return state;
  }
};

export const createDeliveryAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DELIVERY_ADDRESS_REQUEST:
      return { loadingAddress: true };
    case CREATE_DELIVERY_ADDRESS_SUCCESS:
      return { loadingAddress: false, checkoutDeliveryInfo: action.payload };
    case CREATE_DELIVERY_ADDRESS_FAILURE:
      return { loadingAddress: false, error: action.payload };
    default:
      return state;
  }
};
export const checkoutCartReducer = (state = { cartcheckout: [] }, action) => {
  switch (action.type) {
    case CHECKOUT_CART_REQUEST:
      return { loading: true, cartcheckout: [] };
    case CHECKOUT_CART_SUCCESS:
      return { loading: false, cartcheckout: action.payload };
    case CHECKOUT_CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
