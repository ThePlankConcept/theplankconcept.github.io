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
  ONE_WISHLIST_GET_REQUEST,
  ONE_WISHLIST_GET_SUCCESS,
  ONE_WISHLIST_GET_FAIL,
  WISHLIST_DEL_REQUEST,
  WISHLIST_DEL_SUCCESS,
  WISHLIST_DEL_FAIL,
  WISHLIST_DEL_ITEM_FROM_WISHLIST_REQUEST,
  WISHLIST_DEL_ITEM_FROM_WISHLIST_SUCCESS,
  WISHLIST_DEL_ITEM_FROM_WISHLIST_FAIL,
  WISHLIST_DEL_ITEM_SUCCESS,
  WISHLIST_DEL_ITEM_FAIL,
  WISHLIST_DEL_ITEM_REQUEST,
} from "../constants/wishlistConstants";

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
      return { ...state, loading: true };
    case WISHLIST_UPDATE_SUCCESS:
      return { loading: false, userWishList: action.payload, success: true };
    case WISHLIST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getWishlistBySlugReducer = (state = {}, action) => {
  switch (action.type) {
    case ONE_WISHLIST_GET_REQUEST:
      return { wishlists_loading: true };
    case ONE_WISHLIST_GET_SUCCESS:
      return { wishlists_loading: false, wishlist: action.payload };
    case ONE_WISHLIST_GET_FAIL:
      return { wishlists_loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_DEL_REQUEST:
      return { wishlists_loading: true };
    case WISHLIST_DEL_SUCCESS:
      return { wishlists_loading: false, wishlist: action.payload };
    case WISHLIST_DEL_FAIL:
      return { wishlists_loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeWishlistBySlugReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_DEL_ITEM_FROM_WISHLIST_REQUEST:
      return { wishlists_loading: true };
    case WISHLIST_DEL_ITEM_FROM_WISHLIST_SUCCESS:
      return { wishlists_loading: false, wishlist: action.payload };
    case WISHLIST_DEL_ITEM_FROM_WISHLIST_FAIL:
      return { wishlists_loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteItemFromWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_DEL_ITEM_REQUEST:
      return { loading: true };
    case WISHLIST_DEL_ITEM_SUCCESS:
      return { loading: false, success: true };
    case WISHLIST_DEL_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
