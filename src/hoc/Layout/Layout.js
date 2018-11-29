import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component{
  state={
    showSideDrawer: false

  }
  sideDrawerCloserHandler=()=>{
    this.setState({
      showSideDrawer:false
    })
  }

  sideDrawerToggleHandler=()=>{
    this.setState({
      showSideDrawer: !this.state.showSideDrawer
    })
  }
  render(){
    
    return(
      <Auxiliary>
        <Toolbar isAuth={this.props.isAuth} open={this.sideDrawerToggleHandler}></Toolbar>
        <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerCloserHandler} ></SideDrawer>
        <main className={classes.Content}>
          {
            this.props.children
          }
        </main>
      </Auxiliary>
    
    )
  
  }
  
}

const mapStateToProps=state=>{
  return{
    isAuth: state.auth.token !==null
  }
}
export default connect(mapStateToProps)(Layout);