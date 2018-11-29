import React from 'react'
import classes from './BuildControl.css'
import propTypes from 'prop-types';

const buildControl=(props)=>(
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button onClick={()=>props.removeIngridients(props.label)} className={classes.Less}>Less</button>
    <button onClick={()=>props.addIngridients(props.label)} className={classes.More}>More</button>
  </div>
);

buildControl.propTypes={
  label: propTypes.string,
  click: propTypes.func
}
export default buildControl;