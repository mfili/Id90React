import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {  Input, InputLabel } from '@material-ui/core'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import  {Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { changeValue, saveState , saveEmpresa, savePosition, saveCostCenter, saveUnity } from '../../../store/actions/files/fileActions'
import ComponentAutocomplete from '../ComponentAutocomplete.jsx'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2
    },
    divGlobal: {
        position: 'relative',
        margin: '1em'
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
    dialog: {
        overflowY: 'hidden'
    }
})

@connect((store) => {
    var lodash = require('lodash')
    var cargoLabel = lodash.find(store.cargo.cargo,{codigo:''+ store.legajo.codigoCargo})
    var centroCostoLabel = lodash.find(store.centroCosto.centroCosto,{codigo:''+ store.legajo.idCentroCosto})
    var unidadLabel = lodash.find(store.unidad.unidad,{codigo:''+ store.legajo.idUnidad})
    return {
        legajo: store.legajo.legajo,
        cuil: store.legajo.cuil,
        nombre: store.legajo.nombre,
        apellido: store.legajo.apellido,
        confidencial: store.legajo.confidencial,
        numeroFicha: store.legajo.numeroFicha,
        estado: store.estado.estado,
        codigoEstadoEstado: store.estado.codigoEstado,
        codigoEstadoLegajo: store.legajo.codigoEstado,
        labelEstadoEstado: store.estado.labelEstado,
        labelEstadoLegajo: store.legajo.labelEstado,
        empresa: store.empresa.empresa,
        idEmpresaEmpresa: store.empresa.idEmpresa,
        idEmpresaFile: store.legajo.idEmpresa,
        empresaLabelEmpresa: store.empresa.empresaLabel,
        labelEmpresaFile: store.legajo.labelEmpresa,
        cargo: store.cargo.cargo,
        codigoCargoCargo: store.cargo.codigoCargo,
        codigoCargoLegajo: store.legajo.codigoCargo,
        labelCargoCargo: store.cargo.labelCargo,
        labelCargoLegajo: cargoLabel?cargoLabel.codigo + '-' + cargoLabel.descripcion:'',
        centroCosto: store.centroCosto.centroCosto,
        idCentroCostoCentroCosto: store.centroCosto.idCentroCosto,
        idCentroCostoLegajo: store.legajo.idCentroCosto,
        labelCentroCostoCentroCosto: store.centroCosto.labelCentroCosto,
        labelCentroCostoLegajo: centroCostoLabel?centroCostoLabel.codigo + '-' + centroCostoLabel.descripcion:'',
        unidad: store.unidad.unidad,
        idUnidadUnidad: store.unidad.idUnidad,
        idUnidadLegajo: store.legajo.idUnidad,
        labelUnidadUnidad: store.unidad.labelUnidad,
        labelUnidadLegajo: unidadLabel?unidadLabel.codigo + '-' + unidadLabel.descripcion:'',
    }
})

class GeneralData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openCompany: false,
            openCargo: false
        }
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    setState(id, value){
        store.dispatch(saveState(id, value))
    }
    
    setEmpresa(id, value){
        store.dispatch(saveEmpresa(id, value))
    }
    
    setPosition(id, value){
        store.dispatch(savePosition(id, value))
    }
    
    setCostCenter(id, value){
        store.dispatch(saveCostCenter(id, value))
    }
    
    setUnity(id, value){
        store.dispatch(saveUnity(id, value))
    }

    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.divGlobal}>
                <FormGroup >
                    <Grid container spacing={0}>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="legajo"
                                    label="No. Legajo"
                                    value={this.props.legajo}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="cuil"
                                    label="CUIL"
                                    value={this.props.cuil}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="apellido"
                                    label="Apellido"
                                    value={this.props.apellido}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="nombre"
                                    label="Nombre"
                                    value={this.props.nombre}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Estado"
                                idDialog="codigoEstado"
                                titleDialog="Estado"
                                valueTextField={this.props.labelEstadoLegajo}
                                dataList={this.props.estado}
                                setData={this.setState}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="name" >Confidencial</InputLabel>
                                <Select className={classes.select}
                                    value={this.props.confidencial}
                                    onChange={this.handleValueChange}
                                    name="confidencial"
                                    id="confidencial"
                                >
                                    <MenuItem value="S">Si</MenuItem>
                                    <MenuItem value="N">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroFicha"
                                    label="Número de Ficha"
                                    value={this.props.numeroFicha}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Empresa"
                                idDialog="idEmpresa"
                                titleDialog="Empresa"
                                valueTextField={this.props.labelEmpresaFile}
                                dataList={this.props.empresa}
                                setData={this.setEmpresa}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Cargo"
                                idDialog="codigo"
                                titleDialog="Cargo"
                                valueTextField={this.props.labelCargoLegajo}
                                dataList={this.props.cargo}
                                setData={this.setPosition}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Centro de Costo"
                                idDialog="codigo"
                                titleDialog="Centro de costo"
                                valueTextField={this.props.labelCentroCostoLegajo}
                                dataList={this.props.centroCosto}
                                setData={this.setCostCenter}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Unidad"
                                idDialog="codigo"
                                titleDialog="Unidad"
                                valueTextField={this.props.labelUnidadLegajo}
                                dataList={this.props.unidad}
                                setData={this.setUnity}
                            />
                        </Grid>
                    </Grid>
                </FormGroup>
            </div>
        )
    }
}

GeneralData.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(GeneralData)