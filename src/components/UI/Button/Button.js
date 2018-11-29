import React from 'react'
import classes from './Button.css'
import propTypes from 'prop-types';

const button=(props)=>
{
  return <button
  disabled={props.disabled}
  className={[classes.Button,classes[props.btnType]].join(' ')}
  onClick={props.clicked}>
  {props.children}</button>
}

button.propTypes={
  btnType: propTypes.string,
  clicked: propTypes.func,
  
}
export default button