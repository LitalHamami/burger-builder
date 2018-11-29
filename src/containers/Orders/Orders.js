import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';

class Orders extends Component{

  state={
    orders:[],
    loading: false,
  }
  componentWillMount(){
    console.log(this.props.userId+"    userid")
    console.log(this.props.token+"    token")

    this.props.onFetchOrders(this.props.token,this.props.userId);

  }

  render(){
    let orders= this.props.orders.map(order=><Order key={order.id} price={order.price} ingridients={order.ingridients}/>)
    if(this.props.loading){
      orders=<Spinner/>
    }

    return (<div>
      {orders}
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      orders: state.orders.orders,
      loading: state.orders.loading,
      token: state.auth.token,
      userId: state.auth.userId
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders:(token,id)=>dispatch(actions.get_orders(token,id))
 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Orders)