import { CATEGORY_LIST_FAIL, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_REQUEST, ALL_PRODUCT_CATEGORY_REQUEST, ALL_PRODUCT_CATEGORY_SUCCESS, ALL_PRODUCT_CATEGORY_FAIL } from "../constants/categoryConstants";

export const categoryListReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, category: [] };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, category: action.payload };

    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allProductCategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_CATEGORY_REQUEST:
      return { loading: true, category: [] };

    case ALL_PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload };

    case ALL_PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
