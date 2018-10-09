import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import Login from './components/login/Login.jsx'
import Home from './components/Home.jsx'
import HotelForm from './components/hotels/HotelForm.jsx'
import 'typeface-roboto'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import { Provider }  from 'react-redux'
import store from './store/store'

import  MomentUtils  from 'material-ui-pickers/utils/moment-utils'
import  MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

injectTapEventPlugin()

const theme = createMuiTheme({
  palette: {
    primary: Blue,
    secondary: green,
    add: Blue,
    background: {
      default: Blue
    }
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: Blue['400'],
      },
    },
    MuiPickerDTTabs: {
      tabs: {
        color: Blue['400']
      }
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: Blue['400']
      }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        //backgroundColor: Blue['300'],
        //color: 'white',
      },
    },
    MuiPickersClockNumber: {
      selected: {
        backgroundColor: Blue['400'],
      },
    },
    MuiPickersDay: {
      day: {
        color: Blue.A700,
      },
      selected: {
        backgroundColor: Blue['400'],
      },
      current: {
        color: Blue['900'],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        '& > button': {
          color: Blue['400'],
        },
      },
    },

    MuiIconButton: {
      root: {
        height: '24px'
      }
    }

  }
})
class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider style={{ background: '#9E9E9E' }} store={store}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div>
              <Route path="/" render={() => <Home />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/hotelForm" render={() => <HotelForm />} />
            </div>
          </MuiPickersUtilsProvider>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<BrowserRouter>
  <Route path='/' component={App} />
</BrowserRouter>, document.getElementById('app'))