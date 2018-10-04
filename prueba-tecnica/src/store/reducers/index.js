import { combineReducers } from 'redux'


import login from './loginReducer.js'
import company from './companyReducer.js'


export default combineReducers({
  login,
  company
})
