import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckOutSummary.css'

const checkOutSummary=(props)=>{
  return <div className={classes.CheckOutSummary}>
    <h1>We hope it tastes well!!</h1>
    <div style={{width:'100%', height:'300px', margin:'auto'}}>
      <Burger ingridients={props.ingridients}></Burger>
    </div>
    <Button clicked={props.onCheckoutCancelled} btnType="Danger">CANCEL</Button>
    <Button clicked={props.onCheckoutContinued} btnType="Success">CONTINUE</Button>
  </div>
}

export default checkOutSummary