import React from 'react';
import classes from './DrawerToggle.css'
import propTypes from 'prop-types';


const drawerToggle=(props)=>(
  <div className={classes.DrawerToggle} onClick={props.open}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

drawerToggle.propTypes={
  open: propTypes.func
}
export default drawerToggle