import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import propTypes from 'prop-types';


const toolbar=(props) =>
(
    <header className={classes.Toolbar}>
      <DrawerToggle open={props.open}></DrawerToggle>
      <Logo height="80%"/>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth}/>
      </nav>
    </header>
)

toolbar.propTypes={
  open: propTypes.func
}
export default toolbar;