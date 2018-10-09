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
import {Tabs,  Tab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { postPeriod } from '../../../store/actions/period/periodsActions'
import { changeValue } from '../../../store/actions/period/periodActions'

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
        idPeriodo: store.periodo.idPeriodo,
        nroPeriodo: store.periodo.nroPeriodo,
        estado: store.periodo.estado,
        descripcion: store.periodo.descripcion,
        diaInicio: store.periodo.diaInicio,
        duracionDias: store.periodo.duracionDias,
        saved: store.periodos.saved
    }
})

class EditPeriod extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.savePeriod = this.savePeriod.bind(this)
        this.cancelPeriod = this.cancelPeriod.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    savePeriod = () => {
        var data = {}
        data = {
            "idPeriodo": this.props.idPeriodo,
            "nroPeriodo": this.props.nroPeriodo,
            "estado": this.props.estado,
            "descripcion": this.props.descripcion,
            "diaInicio": this.props.diaInicio,
            "duracionDias": this.props.duracionDias
        }
        store.dispatch(postPeriod(data))
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
                    <Typography type="title">{this.props.nroPeriodo?this.props.nroPeriodo + '-' + this.props.descripcion:'[Período]-[Descripción]'}</Typography>
                    <Tooltip title="Save">
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.savePeriod()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelPeriod()}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <div className={classes.divGlobal}>
                    <FormGroup >
                        <Grid container spacing={0}>
                        <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="nroPeriodo"
                                        label="Número Periodo"
                                        type="number"
                                        value={this.props.nroPeriodo}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="estado"
                                        label="Estado"
                                        value={this.props.estado}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="descripcion"
                                        label="Descripción"
                                        value={this.props.descripcion}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="diaInicio"
                                        label="Día Inicio"
                                        type="number"
                                        value={this.props.diaInicio}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="duracionDias"
                                        label="Duración Dias"
                                        type="number"
                                        value={this.props.duracionDias}
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

EditPeriod.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditPeriod))