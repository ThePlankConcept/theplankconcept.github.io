import axios from "axios";
import qs from "qs";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_FILTER_FAIL,
  PRODUCT_RELATED_ITEMS_REQUEST,
  PRODUCT_RELATED_ITEMS_SUCCESS,
  PRODUCT_RELATED_ITEMS_FAIL,
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
      populate: {
        images: {
          fields: ["url"],
        },
      },
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
      {
        product_desc: {
          $containsi: keyword,
        },
      },
      {
        categories: {
          category_name: {
            $containsi: keyword,
          },
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
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/api/products?${query}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error,
    });
  }
};

export const listProductDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/product/${slug}`);
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

export const filterProducts =
  ({ keyword, type, brand }) =>
  async (dispatch) => {
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
        populate: {
          images: {
            fields: ["formats"],
          },
        },
      },
    };
    const filter = {
      $and: [
        {
          typeId: {
            type_name: {
              $in: type,
            },
          },
        },
        {
          brandId: {
            brand_name: {
              $in: brand,
            },
          },
        },
        {
          categories: {
            category_name: {
              $in: keyword,
            },
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
    try {
      dispatch({ type: PRODUCT_FILTER_REQUEST });
      const { data } = await axios.get(`/api/products?${query}`);
      dispatch({
        type: PRODUCT_FILTER_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FILTER_FAIL,
        payload: error,
      });
    }
  };

export const relatedItems = (category) => async (dispatch) => {
  const filter = {
    categories: {
      id: {
        $eq: category,
      },
    },
  };
  const query = qs.stringify({
    populate: {
      product_inventories: {
        populate: {
          images: {
            fields: ["formats"],
          },
        },
      },
    },
    filters: filter,
    pagination: {
      start: 0,
      limit: 10,
    },
  });
  try {
    dispatch({ type: PRODUCT_RELATED_ITEMS_REQUEST });
    const { data } = await axios.get(`/api/products?${query}`);
    dispatch({
      type: PRODUCT_RELATED_ITEMS_SUCCESS,
      payload: [...data.data],
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_RELATED_ITEMS_FAIL,
      payload: error.message,
    });
  }
};
