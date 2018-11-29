import React from 'react'
import classes from './Backdrop.css'
import propTypes from 'prop-types';

const backdrop=(props)=>{
  
  return ( props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)}

backdrop.propTypes={
  show: propTypes.bool,
  clicked: propTypes.func
}
export default backdrop