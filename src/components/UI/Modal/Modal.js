import React, {Component} from 'react'
import classes from './Modal.css'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import propTypes from 'prop-types';

class Modal extends Component{

  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show!==this.props.show || !this.props.showSpinner;
  }

  render(){
    return( 
    <Auxiliary>
      <Backdrop show={this.props.show} clicked={this.props.clicked}/>
        <div className={classes.Modal}
            style={{
              transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: this.props.show? '1': '0'
            }}
        >
        {this.props.children}
        </div>
    </Auxiliary>
    )
  }
}
 
  

Modal.propTypes={
  show: propTypes.bool
}
export default Modal