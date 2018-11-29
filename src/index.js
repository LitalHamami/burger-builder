import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import ordersReducer from './store/reducers/orders'
import thunk from 'redux-thunk'
import AuthReducer from './store/reducers/auth'

const rootReducer= combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: ordersReducer,
  auth: AuthReducer
})

const composeEnhancers =process.env.NODE_ENV==='development' ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const logger=store=>{
  return next=>{
    return action=>{
      const resault=next(action);
      return resault;
    }
  }
}

const store= createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

const app= 
<Provider store={store}>
<BrowserRouter basename={process.env.PUBLIC_URL}>
  <App/>
</BrowserRouter>
</Provider>


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
