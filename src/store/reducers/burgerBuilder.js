import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  totalPrice: 4,
  ingridients: null,
  error: false,
  isOrder: false

};

const addIngridient = (state, action) => {
  const updatedIngridient = { [action.ingridientName.toLowerCase()]: (state.ingridients[action.ingridientName.toLowerCase()]) + 1 }
  const updatedIngridients = updateObject(state.ingridients, updatedIngridient)
  const updatedState = { ingridients: updatedIngridients, totalPrice: state.totalPrice + action.price, isOrder:true }
  return updateObject(state, updatedState)

}

const removeIngridient = (state, action) => {
  if (state.totalPrice > 4) {
    console.log(state.totalPrice)
    const updatedIngridient = { [action.ingridientName.toLowerCase()]: (state.ingridients[action.ingridientName.toLowerCase()]) - 1 }
    const updatedIngridients = updateObject(state.ingridients, updatedIngridient)
    const updatedState = { ingridients: updatedIngridients, totalPrice: state.totalPrice - action.price,isOrder:true }
    return updateObject(state, updatedState)
  }

}

const getIngridients = (state, action) => {
  return updateObject(state, {
    ingridients: {
      salad: action.ingridients.salad,
      bacon: action.ingridients.bacon,
      cheese: action.ingridients.cheese,
      meat: action.ingridients.meat
    },
    totalPrice: 4,
    error: false,
    isOrder:false
  })


}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.ADD_INGRIDIENT): return addIngridient(state, action);
    case (actionTypes.REMOVE_INGRIDIENT): return removeIngridient(state, action)
    case (actionTypes.GET_INGRIDIENT): return getIngridients(state, action)
    case (actionTypes.FETCH_INGRIDIENTS_FAILED): return updateObject(state, { error: true })
    default: return state;
  }

}

export default reducer