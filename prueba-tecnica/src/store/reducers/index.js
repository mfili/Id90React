import { combineReducers } from 'redux'

import login from './loginReducer.js'
import airline from './airlineReducer.js'
import hotel from './hotelReducer.js'


export default combineReducers({
  login,
  airline,
  hotel
})
