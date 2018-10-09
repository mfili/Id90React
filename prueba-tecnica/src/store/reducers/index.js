import { combineReducers } from 'redux'

import login from './loginReducer.js'
import airline from './airlineReducer.js'


export default combineReducers({
  login,
  airline
})
