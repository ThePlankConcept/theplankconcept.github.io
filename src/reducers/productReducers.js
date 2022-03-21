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
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productFilterReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_FILTER_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_FILTER_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { 0: { attributes: { product_inventories: { data: [] } } } } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const relatedProductsReducers = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_RELATED_ITEMS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_RELATED_ITEMS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_RELATED_ITEMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const searchProductsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_SEARCH_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
