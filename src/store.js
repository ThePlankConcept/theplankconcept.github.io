import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
  productFilterReducer,
  relatedProductsReducers,
  searchProductsReducer,
} from "../src/reducers/productReducers";
import { cartReducer, cartReducer2 } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  getUserAddressesReducer,
  updateUserReducer,
  createUserAddressReducer,
  // updateUserReducer,
} from "./reducers/userReducers";
import { categoryListReducer, allProductCategoryReducer } from "./reducers/categoryReducers";
import {
  deleteItemFromWishlistReducer,
  deleteWishlistReducer,
  getUserWishlistReducer,
  getWishlistBySlugReducer,
  updateUserWishlistReducer,
  wishlistCreateReducer,
} from "./reducers/wishlistReducers";
import { checkoutCartReducer, checkoutDetailsReducer } from "./reducers/checkoutReducers";
import { getOrdersReducers, populatedOrdersReducers } from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productFilter: productFilterReducer,
  allProductCategory: allProductCategoryReducer,
  categoryList: categoryListReducer,
  cart: cartReducer,
  cart2: cartReducer2,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userAddresses: getUserAddressesReducer,
  createUserAddress: createUserAddressReducer,
  wishlistCreate: wishlistCreateReducer,
  getUserWishlist: getUserWishlistReducer,
  updateUserWishList: updateUserWishlistReducer,
  relatedProducts: relatedProductsReducers,
  getWishlistBySlugReducer: getWishlistBySlugReducer,
  deleteWishlistReducer: deleteWishlistReducer,
  checkoutDetails: checkoutDetailsReducer,
  checkoutCart: checkoutCartReducer,
  updateUser: updateUserReducer,
  searchProductsReducer: searchProductsReducer,
  getOrdersReducer: getOrdersReducers,
  populatedOrderReducer: populatedOrdersReducers,
  deleteItemFromWishlist: deleteItemFromWishlistReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const subscribedFromStorage = localStorage.getItem("subscribed")
  ? JSON.parse(localStorage.getItem("subscribed"))
  : [];
const purchaseFromStorage = localStorage.getItem("purchase")
  ? JSON.parse(localStorage.getItem("purchase"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userAddressesFromStorage = localStorage.getItem("userAddress")
  ? JSON.parse(localStorage.getItem("userAddress"))
  : [];
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  userAddresses: { userAddress: userAddressesFromStorage },
  cart2: { subscribed: subscribedFromStorage, purchase: purchaseFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
