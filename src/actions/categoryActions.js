import axios from "axios";
import qs from "qs";
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_REQUEST, ALL_PRODUCT_CATEGORY_REQUEST, ALL_PRODUCT_CATEGORY_SUCCESS, ALL_PRODUCT_CATEGORY_FAIL } from "../constants/categoryConstants";

export const listCategory = (keyword) => async (dispatch) => {
  if (keyword) {
    let query = "";
    const populate = {
      brands: {
        fields: ["brand_name"],
      },
      types: {
        fields: ["type_name"],
      },
      products: {
        populate: "product_inventories.images",
      },
    };
    const filter = {
      category_name: {
        $eq: keyword,
      },
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
    // console.log("query", query, keyword);
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST });
      const { data } = await axios.get(`/api/categories?${query}`);
      console.log("response", data);
      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload: error,
      });
    }
  } else {
    const query2 = qs.stringify(
      {
        sort: ["brand_name:asc"],
        fields: ["brand_name"],
      },
      {
        encodeValuesOnly: true, // prettify url
      }
    );
    const query1 = qs.stringify(
      {
        sort: ["type_name:asc"],
        fields: ["type_name"],
      },
      {
        encodeValuesOnly: true, // prettify url
      }
    );

    // console.log("query", query1, keyword);
    let promises = [`/api/types?${query1}`, `/api/brands?${query2}`];

    try {
      dispatch({ type: CATEGORY_LIST_REQUEST });

      axios.all(promises.map((promise) => axios.get(promise))).then(
        axios.spread((types, brands) => {
          // console.log("res", { types, brands });
          dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: { types: types.data, brands: brands.data },
          });
        })
      );
    } catch (error) {
      // console.log(error);
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload: error,
      });
    }
  }
};

export const allProductCategories = (keyword) => async (dispatch) => {
  let query = "";
  const populate = {
    images: {
      populate: "*",
    },
    brands: {
      fields: ["brand_name"],
    },
    types: {
      populate: "*",
    },
  };

  query = qs.stringify({
    populate: populate,
  });
  // console.log("query", query, keyword);
  try {
    dispatch({ type: ALL_PRODUCT_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/categories?${query}`);
    console.log("response", data);
    dispatch({
      type: ALL_PRODUCT_CATEGORY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ALL_PRODUCT_CATEGORY_FAIL,
      payload: error,
    });
  }
};
