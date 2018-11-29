import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'
import propTypes from 'prop-types';

const sideDrawer= (props)=>{
  
  let attachedClasses=[classes.SideDrawer,classes.Close];
  if(props.open){
    attachedClasses=[classes.SideDrawer,classes.Open];
  }
  return(
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed}>
      </Backdrop>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <Logo height="11%" bottom="32px"></Logo>
        <nav >
          <NavigationItems isAuth={props.isAuth}></NavigationItems>
        </nav>
      </div>
    </Auxiliary>
  );
}

sideDrawer.propTypes={
  open: propTypes.bool,
  closed: propTypes.func
}
export default sideDrawer;