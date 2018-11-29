import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import propTypes from 'prop-types';


const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];


const buildControls = (props) => {

  return <div className={classes.BuildControls}>

    <p>
      <strong>
        Current Price: {props.price.toFixed(2)}
      </strong>
    </p>
    {
      controls.map((control) => (
        <BuildControl removeIngridients={props.removeIngridients} addIngridients={props.addIngridients} key={control.label} label={control.label}></BuildControl>
      ))
    }

    <button
      onClick={props.showModal}
      className={classes.OrderButton}
      disabled={!props.purchasable}>{props.isAuth ? "ORDER NOW" : "SING UP TO ORDER"}
    </button>

  </div>


}

buildControls.propTypes = {
  price: propTypes.number,
  click: propTypes.func,
  showModal: propTypes.func,
  purchasable: propTypes.bool
}
export default buildControls