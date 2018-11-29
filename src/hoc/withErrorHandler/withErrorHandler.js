import React, {Component} from 'react'
import Auxiliary from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler=(WrappedComponent, axios) =>
{
  return class extends Component{

  state={
    error: null
  }

  errorConfirmedHandler=()=>{
    this.setState({error:null})
  }

  componentWillMount(){
    this.res=axios.interceptors.request.use(req=>{
      this.setState({error:null});
      return req;
    });
    this.res=axios.interceptors.response.use(res=> res,error=>{
      this.setState({error:error})
    })
  }

  componentWillUnmount(){
    axios.interceptors.request.eject(this.req);
    axios.interceptors.response.eject(this.res);

  }

  render(){
    return(
      <Auxiliary>
        <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
        {this.state.error ? this.state.error.message : null}
        </Modal>
        <WrappedComponent {...this.props}/>
      </Auxiliary>
    )
  }

}
}
export default withErrorHandler;