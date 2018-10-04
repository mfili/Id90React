import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducer from './reducers'

import reduxCookiesMiddleware from 'redux-cookies-middleware'
import { getStateFromCookies } from 'redux-cookies-middleware'

// state to persist in cookies
const paths = {
    //'filter': { name: 'encuesta_satisfaccion_filters' },
    'login': { name: 'encuesta_satisfaccion_login' }
};

// initial state
let initialState = {
    /*filter: {filters: {}},
    data: {data: {}},*/
    login: {logged: false}
}

const middleware = applyMiddleware(
    promise(),
    thunk,
    logger,
    reduxCookiesMiddleware(paths)
)

initialState = getStateFromCookies(initialState, paths)

const store = createStore(
    reducer,
    initialState,
    middleware
)

export default store