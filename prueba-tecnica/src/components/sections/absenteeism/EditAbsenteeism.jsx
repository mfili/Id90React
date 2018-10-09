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
import { postAbsenteeism } from '../../../store/actions/absenteeism/ausentismosActions'
import { saveTypeAbsenteeism, saveReasonAbsenteeism,changeValue } from '../../../store/actions/absenteeism/ausentismoActions'
import { fetchTypeAbsenteeismList, } from '../../../store/actions/absenteeism/tipoAusentismoActions'
import { fetchReasonAbsenteeismList } from '../../../store/actions/absenteeism/reasonAbsenteeismActions'
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
    var fechaTerminoAplicacion = new Date()
    var m = moment(new Date(store.ausentismo.fechaInicioAplicacion))
    fechaTerminoAplicacion = m.add("days",store.ausentismo.numeroDias)

    
    var fechaTerminoReal = new Date()
    var m = moment(new Date(store.ausentismo.fechaReal))
    fechaTerminoReal = m.add("days",store.ausentismo.numeroDias)
    
    var lodash = require('lodash')
    var motivoAusentismoLabel = lodash.find(store.motivoAusentismo.motivoAusentismo,{codigo:''+ store.ausentismo.idMotivoAusentismo})
    return {
        legajo: store.legajo.legajo,
        nombre: store.legajo.nombre,
        apellido: store.legajo.apellido,
        idAusentismo: store.ausentismo.idAusentismo,
        fechaReal: store.ausentismo.fechaReal,
        fechaInicioAplicacion: store.ausentismo.fechaInicioAplicacion,
        numeroDias: store.ausentismo.numeroDias,
        fechaTerminoAplicacion: fechaTerminoAplicacion,
        fechaTerminoReal: fechaTerminoReal,
        tipoAusentismo:store.tipoAusentismo.tipoAusentismo,
        idTipoAusentismo: store.ausentismo.idTipoAusentismo,
        labelTipoAusentismo: store.ausentismo.labelTipoAusentismo,
        motivoAusentismo:store.motivoAusentismo.motivoAusentismo,
        idMotivoAusentismo: store.ausentismo.idMotivoAusentismo,
        labelMotivoAusentismo: motivoAusentismoLabel?motivoAusentismoLabel.codigo + '-' + motivoAusentismoLabel.descripcion:'',
        detalleAdicional: store.ausentismo.detalleAdicional,
        rebajaSueldo: store.ausentismo.rebajaSueldo,
        diasExtras: store.ausentismo.diasExtras,
        licenciaContinua: store.ausentismo.licenciaContinua,
        fechaInicioLicencia: store.ausentismo.fechaInicioLicencia,
        mailsEnviados: store.ausentismo.mailsEnviados,
        saved: store.ausentismos.saved
    }
})

class EditAbsenteeism extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveAbsenteeism = this.saveAbsenteeism.bind(this)
        this.cancelAbsenteeism = this.cancelAbsenteeism.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, new Date(date)))
    }

    saveAbsenteeism = () => {
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
            "idMotivoAusentismo": this.props.idMotivoAusentismo,
            "detalleAdicional": this.props.detalleAdicional,
            "rebajaSueldo": this.props.rebajaSueldo,
            "diasExtras": this.props.diasExtras,
            "licenciaContinua": this.props.licenciaContinua,
            "fechaInicioLicencia": this.props.fechaInicioLicencia,
            "mailsEnviados": this.props.mailsEnviados
        }
        store.dispatch(postAbsenteeism(data))
    }
    
    cancelAbsenteeism = () => {
        const { history } = this.props
        history.push('/ausentismo')
    }

    componentDidMount() {
        store.dispatch(fetchTypeAbsenteeismList())
        store.dispatch(fetchReasonAbsenteeismList(2034))
    }
     
    setTypeAbsenteeism(id, value){
        store.dispatch(saveTypeAbsenteeism(id, value))
    }
    
    setReasonAbsenteeism(id, value){
        store.dispatch(saveReasonAbsenteeism(id, value))
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/ausentismo')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.legajo?this.props.legajo + '-' + this.props.nombre + ' ' + this.props.apellido:'[Legajo]-[Nombre] [Apellido]'}</Typography>
                    <Tooltip title="Save" >
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveAbsenteeism()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" >
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelAbsenteeism()}>
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
                                label="Fecha Real"
                                onError={console.log}
                                value={this.props.fechaReal}
                                onChange={this.handleDateChange.bind(this, 'fechaReal')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Inicio Aplicacion"
                                onError={console.log}
                                value={this.props.fechaInicioAplicacion}
                                onChange={this.handleDateChange.bind(this, 'fechaInicioAplicacion')}
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
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Termino Aplicacion"
                                onError={console.log}
                                value={this.props.fechaTerminoAplicacion}
                                disabled
                                onChange={this.handleDateChange.bind(this, 'fechaTerminoAplicacion')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Termino Real"
                                onError={console.log}
                                value={this.props.fechaTerminoReal}
                                disabled
                                onChange={this.handleDateChange.bind(this, 'fechaTerminoReal')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ComponentAutocomplete 
                                    labelDialog="Tipo Ausentismo"
                                    idDialog="idTipoAusentismo"
                                    titleDialog="Tipo de Ausentismo"
                                    valueTextField={this.props.labelTipoAusentismo}
                                    dataList={this.props.tipoAusentismo}
                                    setData={this.setTypeAbsenteeism}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ComponentAutocomplete 
                                    labelDialog="Causal"
                                    idDialog="codigo"
                                    titleDialog="Causal"
                                    valueTextField={this.props.labelMotivoAusentismo}
                                    dataList={this.props.motivoAusentismo}
                                    setData={this.setReasonAbsenteeism}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="detalleAdicional"
                                        label="Detalle Adicional"
                                        value={this.props.detalleAdicional}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="rebajaSueldo"
                                        label="Rebaja Sueldo"
                                        value={this.props.rebajaSueldo}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="diasExtras"
                                        label="Dias Extras"
                                        type="number"
                                        value={this.props.diasExtras}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="licenciaContinua"
                                        label="Licencia Continua"
                                        value={this.props.licenciaContinua}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Inicio Licencia"
                                onError={console.log}
                                value={this.props.fechaInicioLicencia}
                                onChange={this.handleDateChange.bind(this, 'fechaInicioLicencia')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="mailsEnviados"
                                        label="Mails Enviados"
                                        type="number"
                                        value={this.props.mailsEnviados}
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

EditAbsenteeism.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditAbsenteeism))