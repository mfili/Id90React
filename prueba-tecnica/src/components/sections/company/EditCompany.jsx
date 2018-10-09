import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import DatePicker from 'material-ui-pickers/DatePicker'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import {Tabs,  Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { postCompany } from '../../../store/actions/company/companiesActions'
import { saveProxyFile, saveSignatoryFile, saveEmployerType, changeValue } from '../../../store/actions/company/companyActions'
import { fetchFilesList } from '../../../store/actions/files/filesActions'
import { fetchEmployerTypeList } from '../../../store/actions/company/employerTypeActions'
import ComponentAutocomplete from '../ComponentAutocomplete.jsx'

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
    var lodash = require('lodash')
    var legajoApoderadoLabel = lodash.find(store.legajos.legajos,{idLegajo: store.company.idLegajoApoderado})
    var legajoFirmanteLabel = lodash.find(store.legajos.legajos,{idLegajo: store.company.idLegajoFirmante})
    return {
        companyId: store.company.companyId,
        razonSocial: store.company.razonSocial,
        cuit: store.company.cuit,
        nroIngresosBrutos: store.company.nroIngresosBrutos,
        direccionLinea1: store.company.direccionLinea1,
        direccionLinea2: store.company.direccionLinea2,
        direccionLinea3: store.company.direccionLinea3,
        telefono: store.company.telefono,
        legajos:store.legajos.legajos,
        idLegajoApoderado: store.company.idLegajoApoderado,
        labelLegajoApoderado: legajoApoderadoLabel?legajoApoderadoLabel.legajo + '-' + legajoApoderadoLabel.nombre + ' ' + legajoApoderadoLabel.apellido:'',
        idLegajoFirmante: store.company.idLegajoFirmante,
        labelLegajoFirmante: legajoFirmanteLabel?legajoFirmanteLabel.legajo + '-' + legajoFirmanteLabel.nombre + ' ' + legajoFirmanteLabel.apellido:'',
        codigoSicoss: store.company.codigoSicoss,
        tipoEmpleador: store.tipoEmpleador.tipoEmpleador,
        idTipoEmpleador: store.company.idTipoEmpleador,
        labelTipoEmpleador: store.company.labelTipoEmpleador,
        fechaInicioActividades: store.company.fechaInicioActividades,
        saved: store.companies.saved
    }
})

class EditCompany extends Component {
    constructor(props) {
        super(props)
        this.state ={
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveCompany = this.saveCompany.bind(this)
        this.cancelCompany = this.cancelCompany.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    saveCompany = () => {
        var data = {}

        var tipoEmpleador = null
        if(this.props.idTipoEmpleador){
            tipoEmpleador= {
                "idTipoEmpleador": this.props.idTipoEmpleador
            }
        }
        data = {
            "companyId": this.props.companyId,
            "razonSocial": this.props.razonSocial,
            "cuit": this.props.cuit,
            "nroIngresosBrutos": this.props.nroIngresosBrutos,
            "direccionLinea1": this.props.direccionLinea1,
            "direccionLinea2": this.props.direccionLinea2,
            "direccionLinea3": this.props.direccionLinea3,
            "telefono": this.props.telefono,
            "idLegajoApoderado": this.props.idLegajoApoderado,
            "idLegajoFirmante": this.props.idLegajoFirmante,
            "fechaInicioActividades": this.props.fechaInicioActividades,
            "tipoEmpleador": tipoEmpleador
        }
        store.dispatch(postCompany(data))
    }
    
    cancelCompany = () => {
        const { history } = this.props
        history.push('/empresa')
    }

    componentDidMount() {
        store.dispatch(fetchFilesList())
        store.dispatch(fetchEmployerTypeList())
    }
     
    setProxyFile(id, value){
        store.dispatch(saveProxyFile(id, value))
    }
     
    setSignatoryFile(id, value){
        store.dispatch(saveSignatoryFile(id, value))
    }
     
    setEmployerType(id, value){
        store.dispatch(saveEmployerType(id, value))
    }
    

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/empresa')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.companyId + '-' + this.props.razonSocial}</Typography>
                    <Tooltip title="Save" >
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveCompany()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" >
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelCompany()}>
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
                                        id="razonSocial"
                                        label="Razón Social"
                                        value={this.props.razonSocial}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="cuit"
                                        label="Cuit"
                                        value={this.props.cuit}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="nroIngresosBrutos"
                                        label="No. Ingresos Brutos"
                                        value={this.props.nroIngresosBrutos}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="direccionLinea1"
                                        label="Dirección Linea 1"
                                        value={this.props.direccionLinea1}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="direccionLinea2"
                                        label="Dirección Linea 2"
                                        value={this.props.direccionLinea2}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="direccionLinea3"
                                        label="Dirección Linea 3"
                                        value={this.props.direccionLinea3}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="telefono"
                                        label="Teléfono"
                                        value={this.props.telefono}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <ComponentAutocomplete 
                                    labelDialog="Legajo Apoderado"
                                    idDialog="idLegajo"
                                    titleDialog="Legajo del apoderado"
                                    valueTextField={this.props.labelLegajoApoderado}
                                    dataList={this.props.legajos}
                                    setData={this.setProxyFile}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ComponentAutocomplete 
                                    labelDialog="Legajo Firmante"
                                    idDialog="idLegajo"
                                    titleDialog="Legajo del firmante"
                                    valueTextField={this.props.labelLegajoFirmante}
                                    dataList={this.props.legajos}
                                    setData={this.setSignatoryFile}
                                />
                            </Grid>
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Inicio Actividades"
                                onError={console.log}
                                value={this.props.fechaInicioActividades}
                                onChange={this.handleDateChange.bind(this, 'fechaInicioActividades')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ComponentAutocomplete 
                                    labelDialog="Tipo de Empleador (AFIP)"
                                    idDialog="idTipoEmpleador"
                                    titleDialog="Tipo de empleador (AFIP)"
                                    valueTextField={this.props.labelTipoEmpleador}
                                    dataList={this.props.tipoEmpleador}
                                    setData={this.setEmployerType}
                                />
                            </Grid>
                        </Grid>
                    </FormGroup>
                </div>
            </form>
        )
    }
}

EditCompany.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditCompany))