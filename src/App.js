import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import BuregerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import LogOut from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuth();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BuregerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuth) {
      routes = (<Switch>
        <Route path="/checkout" component={CheckOut}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" component={LogOut}></Route>
        <Route path="/" exact component={BuregerBuilder}></Route>
        <Route path="/auth" component={Auth}></Route>

        <Redirect to="/" />
      </Switch>)
    }
    return (
      <div>
        <Layout>
          {routes}

        </Layout>
        <br></br>
        <br></br>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
