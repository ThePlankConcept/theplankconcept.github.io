import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer, productFilterReducer, relatedProductsReducers } from "../src/reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer, getUserAddressesReducer } from "./reducers/userReducers";
import { categoryListReducer, allProductCategoryReducer } from "./reducers/categoryReducers";
import { getUserWishlistReducer, updateUserWishlistReducer, wishlistCreateReducer } from "./reducers/wishlistReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productFilter: productFilterReducer,
  allProductCategory: allProductCategoryReducer,
  categoryList: categoryListReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userAddresses: getUserAddressesReducer,
  wishlistCreate: wishlistCreateReducer,
  getUserWishlist: getUserWishlistReducer,
  updateUserWishList: updateUserWishlistReducer,
  relatedProducts: relatedProductsReducers,
});
const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const userAddressesFromStorage = localStorage.getItem("userAddresses") ? JSON.parse(localStorage.getItem("userAddresses")) : null;
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  userAddresses: { userAddresses: userAddressesFromStorage },
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
