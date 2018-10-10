import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DatePicker from 'material-ui-pickers/DatePicker'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {Tabs,  Tab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../store/store'
import { connect } from 'react-redux'
import Hotels from './Hotels.jsx'
import {changeValue, getHotels } from '../../store/actions/hotelActions'
import { logout } from '../../store/actions/loginActions'

import  moment from 'moment'

var data= {}

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2
    },
    menuButton: {
        marginRight: '20' 
    },
    tolbar: {
        position: 'relative',
        padding: 0,
        margin: '1em'
    },
    tooltipSave: {
        position: 'absolute',
        right: '30px'
    },
    tooltipCancel: {
        position: 'absolute',
        right: '0px'
    },
    appBar: {
        background: '#FAFAFA',
        color: '#000000'
    },
    title: {
        flex: '0 0 auto',
    },
    divGlobal: {
        position: 'relative',
        margin: '1em'
    },
    grid: {
        position: 'relative',
        marginLeft: '8vw',
        width: '80vw'
    },
    form: {
        width: '70vw',
        marginTop: '3vh',
        padding: 0,
        height: '80vw'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textarea: {
        width: '55vw'
    },
    formControl: {
        marginTop: '1em'
    },
    select: {
        width: '19vw',
        marginTop: '1em'
    },
    field: {
        width: '19vw'
    },
})


@connect((store) => {
    return {
        hotels:store.hotel.hotels,
        guests: store.hotel.guests,
        checkin: store.hotel.checkin,
        checkout: store.hotel.checkout,
        destination: store.hotel.destination,
        keyword:store.hotel.keyword,
        rooms: store.hotel.rooms,
        longitude:store.hotel.longitude,
        latitude:store.hotel.latitude,
        sort_criteria:store.hotel.sort_criteria,
        sort_order:store.hotel.sort_order,
        per_page:store.hotel.per_page,
        page:store.hotel.page,
        currency:store.hotel.currency,
        price_low:store.hotel.price_low,
        price_high:store.hotel.price_high
    }
})

class HotelForm extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.search = this.search.bind(this)
        this.logout = this.logout.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    search = () => {
        store.dispatch(getHotels(this.props.guests,this.props.checkin,this.props.checkout,this.props.destination, this.props.rooms, this.props.currency))
    }
    

    logout(e) {
        store.dispatch(logout())
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/periodo')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
            <AppBar position="static" className={classes.toolBarStyle} >
                <Toolbar>
                    <Typography type="title" color="inherit" className={classes.flex}>
                            Buscá tu Alojamiento
                    </Typography>
                        <Button color="inherit" className={classes.menuButton}
                            raised 
                            onClick = {this.logout} >
                                Logout
                        </Button>
                </Toolbar>
            </AppBar>
                <div className={classes.divGlobal}>
                    <FormGroup >
                        <Grid container spacing={0}>
                        <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="guests"
                                        label="Cantidad de huespedes"
                                        type="number"
                                        value={this.props.guests}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <DatePicker style={{
                                        width: '19vw',
                                        marginTop: '1em'}}
                                    keyboard
                                    label="Entrada"
                                    onError={console.log}
                                    value={this.props.checkin}
                                    onChange={this.handleDateChange.bind(this, 'checkin')}
                                    format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <DatePicker style={{
                                        width: '19vw',
                                        marginTop: '1em'}}
                                    keyboard
                                    label="Salida"
                                    onError={console.log}
                                    value={this.props.checkout}
                                    onChange={this.handleDateChange.bind(this, 'checkout')}
                                    format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="destination"
                                        label="Destino"
                                        value={this.props.destination}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="rooms"
                                        label="Cantidad de habitaciones"
                                        type="number"
                                        value={this.props.rooms}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="currency"
                                        label="Moneda"
                                        value={this.props.currency}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </div>
                <Button className="login-button" onClick={this.search} raised color="primary"  >
                    Buscar
                </Button>
                <div className={classes.divGlobal}>
                    <Hotels/>
                </div>
            </form>
        )
    }
}

HotelForm.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(HotelForm))