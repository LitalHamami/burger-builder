import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import {checkValidity} from '../../shared/utility'


class Auth extends Component {

  state = {
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        valudation: {
          required: true
        },
        valid: false,
        touched: false
      },

      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password'
        },
        value: '',
        valudation: {
          required: true
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false,
    isSingup: true
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onLogIn(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSingup)
  }



  changeInputHandler = (event, inputIdentifier) => {
    const updatesAuthForm = {
      ...this.state.authForm
    }
    const updateFormElement = {
      ...updatesAuthForm[inputIdentifier]
    }
    updateFormElement.value = event.target.value;
    updateFormElement.touched = true;
    updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.valudation)
    updatesAuthForm[inputIdentifier] = updateFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatesAuthForm) {
      formIsValid = updatesAuthForm[inputIdentifier].valid && formIsValid
    }
    this.setState({ authForm: updatesAuthForm, formIsValid: formIsValid })
  }

  swichAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSingup: !prevState.isSingup }
    })
  }
  render() {



    let spinner = null
    if (this.props.loading) {
      spinner = <Spinner></Spinner>
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }


    let formElementArray = [];
    for (let key in this.state.authForm) {
      formElementArray.push({
        id: key,
        config: this.state.authForm[key]
      })
    }

    let form =
      formElementArray.map(formElement => (
        <Input
          invalid={!formElement.config.valid}
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.changeInputHandler(event, formElement.id)}
          touched={formElement.config.touched}>
          ></Input>
      ))

    let authResirect = null;
    if (this.props.isAuth && this.props.isOrder) {
      authResirect = <Redirect to="/checkout" />;
    }
    else if (this.props.isAuth && !this.props.isOrder) {
        authResirect = <Redirect to="/" />;
      
    }
  

    return <div className={classes.Auth}>
      {errorMessage}
      <h4>Fill Your Details</h4>
      {authResirect}
      {spinner}
      <form onSubmit={this.submitHandler}>
        {form}
        <Button btnType='Success' disabled={!this.state.formIsValid}>Submit</Button>
      </form>
      <Button clicked={this.swichAuthModeHandler} btnType='Danger'>SWITCH TO {this.state.isSingup ? 'SINGIN' : 'SINGUP'}</Button>

    </div>
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token != null,
    isOrder: state.burgerBuilder.isOrder
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (email, password, isSingup) => dispatch(actions.logIn(email, password, isSingup))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth)