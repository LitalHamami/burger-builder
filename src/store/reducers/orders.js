import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'
const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const fetchOrdersSuccess = (state, action) => {
  const orders = [];
  for (let i in action.orders) {
    orders.push({ ...action.orders[i], id: i })
  }
  return updateObject(state, { loading: false, orders: orders })
}
const postOrderSuccess = (state, action) => {
  const order = {
    ...action.orderData,
    id: action.orderId,
  }
  return updateObject(state, { loading: false, orders: state.orders.concat(order), purchased: true })
}

const postOrder = (state, action) => {
  return updateObject(state, { loading: true })
}

const fetchOrderFailed = (state, action) => {
  return updateObject(state, { loading: false })
}

const purchaseInit = (state, action) => {
  return updateObject(state, { loading: false })
}

const postOrderFailed = (state, action) => {
  updateObject(state, { loading: false })
}

const postOrderStart = (state, action) => {
  return updateObject(state, { loading: true })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_ORDERS): return postOrder(state,action)
    case (actionTypes.FETCH_ORDER_SUCCESS): return fetchOrdersSuccess(state, action)
    case (actionTypes.FETCH_ORDER_FAILED): fetchOrderFailed(state,action)
    case (actionTypes.PURCHASE_INIT): return purchaseInit(state,action) 
    case (actionTypes.POST_ORDER_SUCCESS): return postOrderSuccess(state,action)
    case (actionTypes.POST_ORDER_FAILED): return postOrderFailed(state,action)
    case (actionTypes.POST_ORDERS_START):return postOrderStart(state,action)
    default: return state 
  }

}

export default reducer