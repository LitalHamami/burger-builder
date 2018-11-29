import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'




export const post_order_success=(id,orderData)=>{
  return{
    type: actionTypes.POST_ORDER_SUCCESS,
    orderId: id,
    orderData:orderData
  }

}

export const post_order_failed=(err)=>{
  return{
    type: actionTypes.POST_ORDER_FAILED,
    error:err
  }
}

export const post_order_start=()=>{
  return{
    type: actionTypes.POST_ORDERS_START
  }
  
}

export const post_order=(order,token)=>{
  return dispatch=>{
    dispatch(post_order_start())
    axios.post('/orders.json?auth='+token,order)
    .then(res=>{
      dispatch(post_order_success(res.data,order))
    })
    .catch((err)=>{
      
      dispatch(post_order_failed(err))
    })
  }

}


export const purchase_init=()=>{
  return{
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetch_orders=()=>{
  return{
    type: actionTypes.FETCH_ORDERS
  }
}

export const get_orders=(token,id)=>{
  return dispatch=>{
    dispatch(fetch_orders())
    const quaryParams='?auth='+token+'&orderBy="userId"&equalTo="'+id+'"';
    axios.get('/orders.json'+quaryParams)
    .then(res=>{
      dispatch(fetch_order_success(res.data))
    })
    .catch((err)=>{
      dispatch(fetch_order_failed(err))
    })
  }

}

export const fetch_order_success=(res)=>{
  return{
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: res
  }
}
export const fetch_order_failed=(err)=>{
  return{
    type: actionTypes.FETCH_ORDER_FAILED,
    error:err
  }
}
