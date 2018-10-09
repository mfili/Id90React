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

class EditHoliday extends Component {
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
        
        var tipoAusentismo = null
        if(this.props.idTipoAusentismo){
            tipoAusentismo= {
                "idTipoAusentismo": this.props.idTipoAusentismo
            }
        }

        data = {
            "idAusentismo": this.props.idAusentismo,
            "fechaReal": this.props.fechaReal,
            "fechaInicioAplicacion": this.props.fechaInicioAplicacion,
            "numeroDias": this.props.numeroDias,
            "fechaTerminoAplicacion": this.props.fechaTerminoAplicacion,
            "fechaTerminoReal": this.props.fechaTerminoReal,
            "tipoAusentismo": tipoAusentismo,
            "detalleAdicional": this.props.detalleAdicional,
            "rebajaSueldo": this.props.rebajaSueldo,
            "diasExtras": this.props.diasExtras,
            "licenciaContinua": this.props.licenciaContinua,
            "fechaInicioLicencia": this.props.fechaInicioLicencia,
            "mailsEnviados": this.props.mailsEnviados
        }
        store.dispatch(postHoliday(data))
    }
    
    cancelHoliday = () => {
        const { history } = this.props
        history.push('/vacaciones')
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/vacaciones')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.legajo?this.props.legajo + '-' + this.props.nombre + ' ' + this.props.apellido:'[Legajo]-[Nombre] [Apellido]'}</Typography>
                    <Tooltip title="Save" className={classes.tooltipSave}>
                        <IconButton aria-label="Save" onClick={event => this.saveHoliday()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" className={classes.tooltipCancel}>
                        <IconButton aria-label="Cancel" onClick={event => this.cancelHoliday()}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <div className={classes.divGlobal}>
                    <FormGroup >
                        <Grid container spacing={0}>
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Inicio"
                                onError={console.log}
                                value={this.props.fechaInicio}
                                onChange={this.handleDateChange.bind(this, 'fechaInicio')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Fin"
                                onError={console.log}
                                value={this.props.fechaFin}
                                onChange={this.handleDateChange.bind(this, 'fechaFin')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="numeroDias"
                                        label="Numero Dias"
                                        type="number"
                                        value={this.props.numeroDias}
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

EditHoliday.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditHoliday))