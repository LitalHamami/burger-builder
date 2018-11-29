import React, { Component } from 'react'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from '../../containers/CheckOut/ContactData/ContactData'
import { connect } from 'react-redux'

class CheckOut extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/"></Redirect>
    if (this.props.ings) {
      const purchasedRedirect=this.props.purchased ? <Redirect to="/"/> : null
      summary = (<div>
        {purchasedRedirect}
        <CheckOutSummary
          ingridients={this.props.ings}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        >
        </CheckOutSummary>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} ></Route></div>
      )
    }
    return <div>
      {summary}

    </div>
  }
}



const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingridients,
    purchased: state.orders.purchased
  };
};



export default connect(mapStateToProps)(CheckOut)