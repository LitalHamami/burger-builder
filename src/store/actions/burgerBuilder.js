import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'




export const add_ingridients=(label, price)=>{
  return {
    type: actionTypes.ADD_INGRIDIENT,
    ingridientName: label,
    price: price
  }
}

export const remove_ingridients=(label, price)=>{
  return {
    type: actionTypes.REMOVE_INGRIDIENT,
    ingridientName: label,
    price: price
  }
}
export const get_ingridients=(res)=>{
  return{
    type: actionTypes.GET_INGRIDIENT,
    ingridients: res
  }
}

export const fetch_ingridients_fauled=()=>{
  return{
    type: actionTypes.FETCH_INGRIDIENTS_FAILED,
  }
}

export const init_ingridients=()=>{
  return dispatch=>{
    axios.get('/ingridients.json')
    .then(res=>{
      dispatch(get_ingridients(res.data))
    })
    .catch((err)=>{
      dispatch(fetch_ingridients_fauled())
    })
  }

}