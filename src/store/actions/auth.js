import * as actionTypes from './actionTypes'
import axios from 'axios'


export const logIn = (email, pass, isSingUp ) => {
  return dispatch => {
    dispatch(auth_start());
    const authData = {
      email: email,
      password: pass,
      returnSecureToken: true
    }
    let url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD1nTAd3tfOBK31NeIHeCS38E5fpvysbdw';
    if(!isSingUp){
      url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD1nTAd3tfOBK31NeIHeCS38E5fpvysbdw';

    }
    axios.post(url, authData)
      .then(res => {
        const experationDate= new Date( new Date().getTime()+res.data.expiresIn * 1000)
        localStorage.setItem("token", res.data.idToken)
        localStorage.setItem("experationDate", experationDate)
        localStorage.setItem("userId", res.data.localId)

        dispatch(auth_success(res.data.idToken,res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn))

      })
      .catch(err => dispatch(auth_failed(err.response.data.error)))
  }


}
export const auth_start = () => {
  return {
    type: actionTypes.AUTH_START
  }
}
export const auth_success = (token,userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId

  }
}
export const auth_failed = (err) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: err
  }
}

export const checkAuthTimeout=(expiresIn)=>{
  return dispatch=>{
    setTimeout(()=>{
      dispatch(logout());
    },expiresIn * 1000)
  }
}


export const logout=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("experationDate")
  localStorage.removeItem("userId")

  return{
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authCheckState=()=>{
  return dispatch=>{
    const token= localStorage.getItem('token');
    if(!token){
      dispatch(logout())
    } else {
      const experationDate= new Date(localStorage.getItem('experationDate'));
      if(experationDate> new Date())
      {
        const userId= localStorage.getItem('userId')
        dispatch(auth_success(token, userId))
        dispatch(checkAuthTimeout(
          (experationDate.getTime() -new Date().getTime())/1000))
      } else {
        dispatch(logout());
      }
    } 
  }
}