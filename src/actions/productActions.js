import axios from "axios";
import qs from "qs";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

export const listProducts = (keyword) => async (dispatch) => {
  let query = "";
  const populate = {
    brandId: {
      fields: ["brand_name"],
    },
    typeId: {
      fields: ["type_name"],
    },
    categories: {
      fields: ["category_name"],
    },
    product_inventories: {
      populate: "*",
    },
  };
  const filter = {
    $or: [
      {
        typeId: {
          type_name: {
            $containsi: keyword,
          },
        },
      },
      {
        product_name: {
          $containsi: keyword,
        },
      },
    ],
  };
  if (keyword) {
    query = qs.stringify({
      populate: populate,
      filters: filter,
    });
  } else {
    query = qs.stringify({
      populate: populate,
    });
  }
  console.log("query", query, keyword);
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/api/products?${query}`);
    // console.log('response',data);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error,
    });
  }
};

export const listProductDetails = (slug) => async (dispatch) => {
  console.log("action called");
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/product/${slug}`);
    console.log("response", { ...data.data });
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: { ...data.data },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
