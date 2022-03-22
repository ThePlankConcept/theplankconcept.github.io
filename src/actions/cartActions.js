import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM2,
  CART_PUSH_FAIL,
  CART_PUSH_REQUEST,
  CART_PUSH_SUCCESS,
  CART_REMOVE_ITEM,
  CART_REMOVE_ITEM2,
} from "../constants/cartConstant";
import qs from "qs";

export const addToCart = (slug, qty, subscription, inventory) => async (dispatch, getState) => {
  console.log("incartaction", slug, qty, subscription, inventory);
  const { data } = await axios.get(`/api/products/product/${slug}`);
  console.log("Inventory", inventory);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      subscription: subscription,
      product: data.data[0].attributes.product_name,
      name: data.data[0].attributes.product_name,
      image:
        data.data[0].attributes.product_inventories.data[inventory].attributes.images.data[0]
          .attributes.formats.thumbnail.url,
      price: data.data[0].attributes.price,
      countInStock: data.data[0].attributes.product_inventories.data[inventory].attributes.quantity,
      slug: slug,
      sku: data.data[0].attributes.product_inventories.data[inventory].attributes.sku,
      qty,
      productInventoryIndex: inventory,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart2 = (id, subscription) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM2,
    payload: { id, subscription },
  });
  if (subscription) {
    localStorage.setItem("subscribed", JSON.stringify(getState().cart2.subscribed));
  } else {
    localStorage.setItem("purchase", JSON.stringify(getState().cart2.purchase));
  }
};

export const addToCart2 =
  ({ id, qty, subscription, period }) =>
  async (dispatch, getState) => {
    console.log("incartaction", id, qty, subscription, period);

    let query = "";
    const populate = {
      product: {
        fields: ["product_name", "six_month_price", "twelve_month_price", "price", "slug"],
      },
      images: {
        fields: ["formats"],
      },
    };
    query = qs.stringify({
      populate: populate,
    });

    const { data } = await axios.get(`/api/product-inventories/${id}?${query}`);
    console.log("cart action", data);
    dispatch({
      type: CART_ADD_ITEM2,
      payload: {
        product_name: data.data.attributes.product.data.attributes.product_name,
        inventory_id: data.data.id,
        sku: data.data.attributes.sku,
        image: data.data.attributes.images.data[0].attributes.formats.thumbnail.url,
        six_month_price: data.data.attributes.product.data.attributes.six_month_price,
        price: data.data.attributes.product.data.attributes.price,
        twelve_month_price: data.data.attributes.product.data.attributes.twelve_month_price,
        slug: data.data.attributes.product.data.attributes.slug,
        subscription,
        qty,
        countInStock: data.data.attributes.quantity,
        period,
      },
    });
    if (subscription) {
      localStorage.setItem("subscribed", JSON.stringify(getState().cart2.subscribed));
    } else {
      localStorage.setItem("purchase", JSON.stringify(getState().cart2.purchase));
    }
  };

export const pushCartAction = (leasePeriod) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
    cart2: { subscribed, purchase },
  } = getState();
  // console.log("subscribed", subscribed);
  // console.log("purchase", purchase);
  // console.log("leasePeriod", leasePeriod);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.jwt,
    },
  };

  let tempArray = [];
  subscribed.map((s) => {
    tempArray.push({ product_inventory: s.inventory_id, quantity: s.qty, period: leasePeriod });
  });
  purchase.map((p) => {
    tempArray.push({ product_inventory: p.inventory_id, quantity: p.qty, period: null });
  });

  try {
    dispatch({
      type: CART_PUSH_REQUEST,
    });

    console.log("datainpush action", { cart_items: { data: tempArray } });
    const { data } = await axios.post(
      "/api/carts/createcart",
      { data: { cart_items: { data: tempArray } } },
      config
    );
    console.log("cartCreated", data);
    dispatch({
      type: CART_PUSH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_PUSH_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
