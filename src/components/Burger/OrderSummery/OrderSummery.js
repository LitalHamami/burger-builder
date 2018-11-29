import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'
import propTypes from 'prop-types';


const orderSummary=(props)=>{
  const tranformedIngridiients= props.ingridients;
  return (
    
    <Auxiliary>
      
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {
          Object.keys(tranformedIngridiients).map(key=>{
            return <li key={key}>
              <span 
                style={{textTranform:'capitalize'}}>
                {key}: {tranformedIngridiients[key]}
              </span>
            </li>
          })
        }
      </ul>
      <strong>Total Price {props.totalPrice.toFixed(2)}</strong>
      <p>Continue to Checkout?</p>
      <Button clicked={props.cancel} btnType="Danger">CANCEL</Button>
      <Button clicked={props.continue} btnType="Success">CONTINUE</Button>

    </Auxiliary>
  )
}

orderSummary.propTypes={
  totalPrice: propTypes.number,
  ingridients: propTypes.object,
  cancel: propTypes.func,
  continue: propTypes.func

}
export default orderSummary;