import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    showModal: false,
    showSpinner: false

  }

  componentDidMount() {
    this.props.onInitIngridients();
  }
  updatePurchaseState() {
    const ingridients = { ...this.props.ings };
    const sum = Object.keys(ingridients)
      .map(igKey => {
        return ingridients[igKey];
      }).reduce((sum, el) => {
        return sum += el;
      }, 0)
    return sum > 0
  }


  showModalHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        showModal: true
      })

    }
    else{
   
      this.props.history.push("/auth")
    }
    
  }

  purchaseCancelHandler = () => {
    this.setState({ showModal: false })
  }
  purchaseContinuelHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push('/checkout')

  }


  render() {
    let modal = null;
    let burger = null;

    if (this.props.error || this.props.ings === null) {
      if (this.props.error) {
        modal = <p>Ingridients can't be loaded!</p>

      }
      else {
        modal = <Spinner></Spinner>
      }

    }
    else {
      
      modal =
        (
          <Modal show={this.state.showModal}>
            <OrderSummary
              totalPrice={this.props.tPrice}
              cancel={this.purchaseCancelHandler}
              continue={this.purchaseContinuelHandler}
              ingridients={this.props.ings}
            ></OrderSummary>
          </Modal>
        )
      burger = (
        <Auxiliary>
          <Burger ingridients={this.props.ings}></Burger>
          <BuildControls
            isAuth={this.props.isAuth}
            addIngridients={(label) => this.props.onAddIngridients(label)}
            removeIngridients={(label) => this.props.onRemoveIngridients(label)}
            ingridients={this.props.ings}
            price={this.props.tPrice}
            purchasable={this.updatePurchaseState()}
            showModal={this.showModalHandler}
          >
          </BuildControls>
        </Auxiliary>


      )


    }
    return (
      <Auxiliary>
       {modal}
       {burger}
      </Auxiliary>

    )
  }



}







const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingridients,
    tPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngridients: (label) => dispatch(actions.add_ingridients(label, INGREDIENT_PRICES[label.toLowerCase()])),
    onRemoveIngridients: (label) => dispatch(actions.remove_ingridients(label, INGREDIENT_PRICES[label.toLowerCase()])),
    onInitIngridients: () => {
      dispatch(actions.init_ingridients())
    },
    onInitPurchased: () => dispatch(actions.purchase_init())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);