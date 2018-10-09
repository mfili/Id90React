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
//import { postPeriod } from '../../store/actions/period/periodsActions'

import  moment from 'moment'

var data= {}

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2
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
        //saved: store.periodos.saved
    }
})

class HotelForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: 1,
            checkin: Date(),
            checkout: Date(),
            destination: '',
            rooms: 1,
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.search = this.search.bind(this)
        this.cancelPeriod = this.cancelPeriod.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    search = () => {
        var data = {}
        data = {
            "idPeriodo": this.props.idPeriodo,
            "nroPeriodo": this.props.nroPeriodo,
            "estado": this.props.estado,
            "descripcion": this.props.descripcion,
            "diaInicio": this.props.diaInicio,
            "duracionDias": this.props.duracionDias
        }
        store.dispatch(searchHotels(data))
    }
    
    cancelPeriod = () => {
        const { history } = this.props
        history.push('/periodo')
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/periodo')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">Buscá tu Alojamiento</Typography>
                </Toolbar>
                <div className={classes.divGlobal}>
                    <FormGroup >
                        <Grid container spacing={0}>
                        <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="guests"
                                        label="Cantidad de huespedes"
                                        type="number"
                                        value={this.state.guests}
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
                                    value={this.state.checkin}
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
                                    value={this.state.checkout}
                                    onChange={this.handleDateChange.bind(this, 'checkout')}
                                    format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="destination"
                                        label="Destino"
                                        value={this.state.destination}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="rooms"
                                        label="Habitaciones"
                                        type="number"
                                        value={this.state.rooms}
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
            </form>
        )
    }
}

HotelForm.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(HotelForm))