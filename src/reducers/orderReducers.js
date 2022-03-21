import { GET_ORDER_FAIL,GET_ORDER_REQUEST , GET_ORDER_SUCCESS  ,GET_POPULATED_ORDER_FAIL, GET_POPULATED_ORDER_REQUEST, GET_POPULATED_ORDER_SUCCESS} from "../constants/orderConstant";

export const getOrdersReducers = (state = { order: [] }, action) => {
    switch (action.type) {
      case GET_ORDER_REQUEST:
        return { loading: true, ...state };
  
      case   GET_ORDER_SUCCESS:
        return { loading: false, order: action.payload };
  
      case  GET_ORDER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const populatedOrdersReducers = (state = { order: [] }, action) => {
    switch (action.type) {
      case GET_POPULATED_ORDER_REQUEST:
        return { popLoading: true, ...state };
  
      case   GET_POPULATED_ORDER_SUCCESS:
        return { popLoading: false, populatedOrder: action.payload };
  
      case  GET_POPULATED_ORDER_FAIL:
        return { popLoading: false, popError: action.payload };
      default:
        return state;
    }
  };