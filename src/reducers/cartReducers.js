import {
  CART_ADD_ITEM,
  CART_ADD_ITEM2,
  CART_REMOVE_ITEM,
  CART_REMOVE_ITEM2,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};
export const cartReducer2 = (state = { subscribed: [], purchase: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM2:
      const item = action.payload;
      // console.log("itemin cart reducer", item, state.subscribed);
      if (item.subscription) {
        const existItem = state.subscribed.find((x) => x.inventory_id === item.inventory_id);
        console.log(existItem);
        if (existItem) {
          console.log("itemin cart reducer exist", state.subscribed);
          return {
            ...state,
            subscribed: state.subscribed.map((x) =>
              x.inventory_id === existItem.inventory_id ? item : x
            ),
          };
        } else {
          console.log("itemin cart reducer no exist", state.subscribed);
          return {
            ...state,
            subscribed: [...state.subscribed, item],
          };
        }
      } else {
        const existItem = state.purchase.find((x) => x.inventory_id === item.inventory_id);
        if (existItem) {
          return {
            ...state,
            purchase: state.purchase.map((x) =>
              x.inventory_id === existItem.inventory_id ? item : x
            ),
          };
        } else {
          return {
            ...state,
            purchase: [...state.purchase, item],
          };
        }
      }

    case CART_REMOVE_ITEM2:
      console.log("action payload", action.payload);
      if (action.payload.subscription) {
        return {
          ...state,
          subscribed: state.subscribed.filter((x) => x.inventory_id !== action.payload.id),
        };
      } else {
        return {
          ...state,
          purchase: state.purchase.filter((x) => x.inventory_id !== action.payload.id),
        };
      }
    default:
      return state;
  }
};
