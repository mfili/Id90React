import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import Login from './Login.jsx'
import Home from './Home.jsx'
import 'typeface-roboto'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import { Provider } from 'react-redux'
import store from './store/store'

const theme = createMuiTheme({
  palette: {
    primary: Blue,
    secondary: green,
    add: Blue
  }
})

class App extends Component {
  render() {
    return (
      <Provider   style ={{ background:'#9E9E9E' }} store={store}>
        <MuiThemeProvider theme={theme}>
          <div>
            <Route path="/" render={() => <Login/>}/>
            <Route path="/login" render={() => <Login/>}/>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App;
