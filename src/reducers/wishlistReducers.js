import { WISHLIST_CREATE_REQUEST, WISHLIST_CREATE_SUCCESS, WISHLIST_CREATE_FAIL, WISHLIST_GET_REQUEST, WISHLIST_GET_SUCCESS, WISHLIST_GET_FAIL, WISHLIST_UPDATE_REQUEST, WISHLIST_UPDATE_SUCCESS, WISHLIST_UPDATE_FAIL } from "../constants/wishlistConstants";

export const wishlistCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_CREATE_REQUEST:
      return { loading: true };
    case WISHLIST_CREATE_SUCCESS:
      return { loading: false, userWishList: action.payload };
    case WISHLIST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_GET_REQUEST:
      return { loading: true };
    case WISHLIST_GET_SUCCESS:
      return { loading: false, userWishList: action.payload };
    case WISHLIST_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateUserWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_UPDATE_REQUEST:
      return { loading: true };
    case WISHLIST_UPDATE_SUCCESS:
      return { loading: false, userWishList: action.payload, success: true };
    case WISHLIST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
