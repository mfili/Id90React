import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import DatePicker from 'material-ui-pickers/DatePicker'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs, { Tab } from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { postHoliday } from '../../../store/actions/holiday/holidaysActions'
import { changeValue } from '../../../store/actions/holiday/holidayActions'
import ComponentAutocomplete from '../ComponentAutocomplete.jsx'

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
    typography:{
        fontSize:'1.5em'
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
        width: '30vw'
    },
    form: {
        width: '43vw',
        margin: '0',
        padding: 0,
        height: '30vw'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        marginTop: '1em'
    },
    field: {
        width: '19vw'
    },
})


@connect((store) => {
    var fechaFin = new Date()
    var m = moment(new Date(store.vacacion.fechaInicio))
    fechaFin = m.add("days",store.vacacion.numeroDias)
    return {
        legajo: store.legajo.legajo,
        nombre: store.legajo.nombre,
        apellido: store.legajo.apellido,
        idVacaciones: store.vacacion.idVacaciones,
        fechaInicio: store.vacacion.fechaInicio,
        fechaFin: fechaFin,
        numeroDias: store.vacacion.numeroDias,
        saved: store.vacaciones.saved
    }
})

class Totales extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveHoliday = this.saveHoliday.bind(this)
        this.cancelHoliday = this.cancelHoliday.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }


    saveHoliday = () => {
        var data = {}
        data = {
        }
        store.dispatch(postHoliday(data))
    }
    
    cancelHoliday = () => {
        const { history } = this.props
        history.push('/vacaciones')
    }

    render() {
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <div className={classes.divGlobal}>
                    <FormGroup >
                        <Grid container spacing={0}>
                            <Grid item xs={12} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Inicial"
                                onError={console.log}
                                value={this.props.fechaInicial}
                                onChange={this.handleDateChange.bind(this, 'fechaInicial')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="diasUltimoPeriodo"
                                        label="Días/año último priodo"
                                        type="number"
                                        value={this.props.diasUltimoPeriodo}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="diasIniciales"
                                        label="Dias Iniciales"
                                        type="number"
                                        value={this.props.diasIniciales}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </div>
            </form>
        )
    }
}

Totales.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(Totales))