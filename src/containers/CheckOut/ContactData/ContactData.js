import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import {checkValidity} from '../../../shared/utility'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        valudation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        valudation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        valudation: {
          required: true,
          minLength:5,
          maxLength: 5
        },
        valid: false,
        touched: false

      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        valudation: {
          required: true
        },
        valid: false,
        touched: false

      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        valudation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displeyValue: 'Fastest' },
            { value: 'cheapest', displeyValue: 'Cheapest' }
          ]
        },
        valudation:{},
        value: 'fastest',
        valid: true,

      },

    },
    formIsValid: false,
    // loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();

    const fromData={};
    for(let formElementIdentifier in this.state.orderForm){
      fromData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingridients: this.props.ings,
      price: this.props.tPrice,
      orderData: fromData,
      userId: this.props.userId
    }

    this.props.onPostOrder(order,this.props.token)

  }


  changeInputHandler=(event, inputIdentifier)=>{
    const updatesOrderForm={
      ...this.state.orderForm
    }
    const updateFormElement= {
      ...updatesOrderForm[inputIdentifier]
    }
    updateFormElement.value=event.target.value;    
    updateFormElement.touched=true;

    updateFormElement.valid=checkValidity(updateFormElement.value,updateFormElement.valudation)
    updatesOrderForm[inputIdentifier]=updateFormElement;
    let formIsValid=true;
    for(let inputIdentifier in updatesOrderForm){
      formIsValid= updatesOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({orderForm:updatesOrderForm, formIsValid:formIsValid})
  }


  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = <form onSubmit={this.orderHandler}>
      {
        formElementArray.map(formElement => (
          <Input
            invalid={!formElement.config.valid}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.changeInputHandler(event,formElement.id)}
            touched={formElement.config.touched}>           
          </Input>
        ))
      }
      <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
    </form>;
    if (this.props.loading) {
      form = <Spinner></Spinner>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter yout Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingridients,
      tPrice: state.burgerBuilder.totalPrice,
      orders: state.orders.orders,
      loading: state.orders.loading,
      token: state.auth.token,
      userId: state.auth.userId
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onPostOrder:(order,token)=>dispatch(actions.post_order(order,token))
 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContactData))