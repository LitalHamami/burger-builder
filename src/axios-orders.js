import axios from 'axios'

const instance= axios.create({
  baseURL: 'https://react-my-burger-cd0c0.firebaseio.com/'
})

export default instance;