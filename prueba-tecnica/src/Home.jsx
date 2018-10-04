import React from 'react'
//import NavigationBar from './components/navigation/NavigationBar.jsx'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

connect((store) => {
    console.log("HOLA")
    return {
        logged: true
    }
  })
class Home extends React.Component {  
    render () {
        var navigation= {}
        var login= {}
        navigation = <div>Hola Word</div>/*<div><NavigationBar/><Redirect to="/" push /></div>*/
        login =<Redirect to="/login" push />
        return (
            <div>
            {
                login
            }
            </div>
        )
    }
}
  
export default Home