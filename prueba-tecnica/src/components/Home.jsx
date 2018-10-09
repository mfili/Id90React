import React from 'react'
import HotelForm from '../components/hotels/HotelForm.jsx'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

@connect((store) => {
    return {
        logged: store.login.logged
    }
  })
class Home extends React.Component {  
    
    render () {
        var hotelForm= {}
        var login= {}
        hotelForm = <div><HotelForm/><Redirect to="/" push /></div>
        login =<Redirect to="/login" push />
        return (
            <div>
            {
                (this.props.logged === true) &&  
                hotelForm
            }
            {
                (this.props.logged === false) &&
                login
            }
            </div>
        )
    }
}
  
export default Home