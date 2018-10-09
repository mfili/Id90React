import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import {DatePicker} from 'material-ui-pickers'
import Typography from '@material-ui/core/Typography'
import { Input,InputLabel } from '@material-ui/core'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import {Dialog,
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
import { saveState, 
    saveEgressReason, 
    saveClass, 
    saveAgreement, 
    saveCategory, 
    saveTypeContract, 
    savePaymentRegime, 
    saveTypeWorkingDay, 
    saveLaborUnion, 
    saveWorkplace,
    saveAdditionalClassification1,
    saveAdditionalClassification2,
    saveJefe,
    changeValue
} from '../../../store/actions/files/fileActions'
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
    var motivoBajaLabel = lodash.find(store.motivoBaja.motivoBaja,{codigo:''+ store.legajo.idMotivoBaja})
    var tipoContratoLabel = lodash.find(store.tipoContrato.tipoContrato,{codigo:''+ store.legajo.idTipoContrato})
    var regimenPagoLabel = lodash.find(store.regimenPago.regimenPago,{codigo:''+ store.legajo.idRegimenPago})
    var tipoJornadaLabel = lodash.find(store.tipoJornada.tipoJornada,{codigo:''+ store.legajo.idTipoJornada})
    var sindicatoLabel = lodash.find(store.sindicato.sindicato,{codigo:''+ store.legajo.idSindicato})
    var lugarTrabajoLabel = lodash.find(store.lugarTrabajo.lugarTrabajo,{codigo:''+ store.legajo.idLugarTrabajo})
    var clasificacionAdicional1Label = lodash.find(store.clasificacionAdicional1.clasificacionAdicional1,{codigo:''+ store.legajo.idClasificacionAdicional1})
    var clasificacionAdicional2Label = lodash.find(store.clasificacionAdicional2.clasificacionAdicional2,{codigo:''+ store.legajo.idClasificacionAdicional2})
    var jefeLabel = lodash.find(store.legajos.legajos,{idLegajo: store.legajo.idJefe})
    return {
        fechaAlta: store.legajo.fechaAlta,
        fechaAntiguedad: store.legajo.fechaAntiguedad,
        fechaBaja: store.legajo.fechaBaja,
        motivoBaja: store.motivoBaja.motivoBaja,
        idMotivoBajaMotivoBaja: store.motivoBaja.idMotivoBaja,
        idMotivoBajaLegajo: store.legajo.idMotivoBaja,
        labelMotivoBajaMotivoBaja: store.motivoBaja.labelMotivoBaja,
        labelMotivoBajaLegajo: motivoBajaLabel?motivoBajaLabel.codigo + '-' + motivoBajaLabel.descripcion:'',
        antiguedad: store.legajo.antiguedad,
        tipoContrato: store.tipoContrato.tipoContrato,
        idTipoContratoTipoContrato: store.tipoContrato.idTipoContrato,
        idTipoContratoLegajo: store.legajo.idTipoContrato,
        labelTipoContratoTipoContrato: store.tipoContrato.labelTipoContrato,
        labelTipoContratoLegajo: tipoContratoLabel?tipoContratoLabel.codigo + '-' + tipoContratoLabel.descripcion:'',
        regimenPago: store.regimenPago.regimenPago,
        idRegimenPagoRegimenPago: store.regimenPago.idRegimenPago,
        idRegimenPagoLegajo: store.legajo.idRegimenPago,
        labelRegimenPagoRegimenPago: store.regimenPago.labelRegimenPago,
        labelRegimenPagoLegajo: regimenPagoLabel?regimenPagoLabel.codigo + '-' + regimenPagoLabel.descripcion:'',
        tipoJornada: store.tipoJornada.tipoJornada,
        idTipoJornadaTipoJornada: store.tipoJornada.idTipoJornada,
        idTipoJornadaLegajo: store.legajo.idTipoJornada,
        labelTipoJornadaTipoJornada: store.tipoJornada.labelTipoJornada,
        labelTipoJornadaLegajo: tipoJornadaLabel?tipoJornadaLabel.codigo + '-' + tipoJornadaLabel.descripcion:'',
        clase: store.clases.clase,
        idClaseClase: store.clases.idClase,
        idClaseLegajo: store.legajo.idClase,
        labelClaseClase: store.clases.labelClase,
        labelClaseLegajo: store.legajo.labelClase,
        convenio: store.convenio.convenio,
        codigoConvenioConvenio: store.convenio.codigoConvenio,
        codigoConvenioLegajo: store.legajo.codigoConvenio,
        labelConvenioConvenio: store.convenio.labelConvenio,
        labelConvenioLegajo: store.legajo.labelConvenio,
        categoria: store.categoria.categoria,
        codigoCategoriaCategoria: store.categoria.codigoCategoriaCategoria,
        codigoCategoriaLegajo: store.legajo.codigoCategoriaCategoria,
        labelCategoriaCategoria: store.categoria.labelCategoria,
        labelCategoriaLegajo: store.legajo.labelCategoria,
        sindicato: store.sindicato.sindicato,
        idSindicatoSindicato: store.sindicato.idSindicato,
        idSindicatoLegajo: store.legajo.idSindicato,
        labelSindicatoSindicato: store.sindicato.labelSindicato,
        labelSindicatoLegajo: sindicatoLabel?sindicatoLabel.codigo + '-' + sindicatoLabel.descripcion:'',
        lugarTrabajo: store.lugarTrabajo.lugarTrabajo,
        idLugarTrabajoLugarTrabajo: store.lugarTrabajo.idLugarTrabajo,
        idLugarTrabajoLegajo: store.legajo.idLugarTrabajo,
        labelLugarTrabajoLugarTrabajo: store.lugarTrabajo.labelLugarTrabajo,
        labelLugarTrabajoLegajo: lugarTrabajoLabel?lugarTrabajoLabel.codigo + '-' + lugarTrabajoLabel.descripcion:'',
        clasificacionAdicional1: store.clasificacionAdicional1.clasificacionAdicional1,
        idClasificacionAdicional1ClasificacionAdicional1: store.clasificacionAdicional1.idClasificacionAdicional1,
        idClasificacionAdicional1Legajo: store.legajo.idClasificacionAdicional1,
        labelClasificacionAdicional1ClasificacionAdicional1: store.clasificacionAdicional1.labelClasificacionAdicional1,
        labelClasificacionAdicional1Legajo: clasificacionAdicional1Label?clasificacionAdicional1Label.codigo + '-' + clasificacionAdicional1Label.descripcion:'',
        clasificacionAdicional2: store.clasificacionAdicional2.clasificacionAdicional2,
        idClasificacionAdicional2ClasificacionAdicional2: store.clasificacionAdicional2.idClasificacionAdicional2,
        idClasificacionAdicional2Legajo: store.legajo.idClasificacionAdicional2,
        labelClasificacionAdicional2ClasificacionAdicional2: store.clasificacionAdicional2.labelClasificacionAdicional2,
        labelClasificacionAdicional2Legajo: clasificacionAdicional2Label?clasificacionAdicional2Label.codigo + '-' + clasificacionAdicional2Label.descripcion:'',
        ocupacion: store.legajo.ocupacion,
        telefonoInterno: store.legajo.telefonoInterno,
        horasMensuales: store.legajo.horasMensuales,
        idSistemaRRHH: store.legajo.idSistemaRRHH,
        numeroCredencial: store.legajo.numeroCredencial,
        tipoCentroCostos: store.legajo.tipoCentroCostos,
        fechaAdicional1: store.legajo.fechaAdicional1,
        fechaAdicional2: store.legajo.fechaAdicional2,
        textoAdicional1: store.legajo.textoAdicional1,
        textoAdicional2: store.legajo.textoAdicional2,
        montoAdicional1: store.legajo.montoAdicional1,
        montoAdicional2: store.legajo.montoAdicional2,
        jefe: store.legajos.legajos,
        idJefeJefe: store.legajos.idJefe,
        idJefeLegajo: store.legajo.idJefe,
        labelJefeJefe: store.legajos.labelJefe,
        labelJefeLegajo: jefeLabel?jefeLabel.legajo + '-' + jefeLabel.nombre + ' ' + jefeLabel.apellido:''
    }
})

class CompanyData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, new Date(date)))
    }
      
    setEgressReason(id, value){
        store.dispatch(saveEgressReason(id, value))
    }
      
    setClass(id, value){
        store.dispatch(saveClass(id, value))
    }
      
    setAgreement(id, value){
        store.dispatch(saveAgreement(id, value))
    }
      
    setCategory(id, value){
        store.dispatch(saveCategory(id, value))
    }
     
    setTypeContract(id, value){
        store.dispatch(saveTypeContract(id, value))
    }
     
    setPaymentRegime(id, value){
        store.dispatch(savePaymentRegime(id, value))
    }
     
    setTypeWorkingDay(id, value){
        store.dispatch(saveTypeWorkingDay(id, value))
    }
     
    setLaborUnion(id, value){
        store.dispatch(saveLaborUnion(id, value))
    }
     
    setWorkplace(id, value){
        store.dispatch(saveWorkplace(id, value))
    }
     
    setAdditionalClassification1(id, value){
        store.dispatch(saveAdditionalClassification1(id, value))
    }
     
    setAdditionalClassification2(id, value){
        store.dispatch(saveAdditionalClassification2(id, value))
    }
     
    setJefe(id, value){
        store.dispatch(saveJefe(id, value))
    }

    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.divGlobal}>
                <FormGroup >
                    <Grid container spacing={0}>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha de Alta"
                                onError={console.log}
                                value={this.props.fechaAlta}
                                onChange={this.handleDateChange.bind(this, 'fechaAlta')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Antigüedad Reconocida"
                                onError={console.log}
                                value={this.props.fechaAntiguedad}
                                onChange={this.handleDateChange.bind(this, 'fechaAntiguedad')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha de Baja"
                                onError={console.log}
                                value={this.props.fechaBaja}
                                onChange={this.handleDateChange.bind(this, 'fechaBaja')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Motivo Baja"
                                idDialog="codigo"
                                titleDialog="Motivo de baja"
                                valueTextField={this.props.labelMotivoBajaLegajo}
                                dataList={this.props.motivoBaja}
                                setData={this.setEgressReason}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="antiguedad"
                                    label="Antigüedad"
                                    type="number"
                                    value={this.props.birthdate}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Tipo Contrato"
                                idDialog="codigo"
                                titleDialog="Tipo de contrato"
                                valueTextField={this.props.labelTipoContratoLegajo}
                                dataList={this.props.tipoContrato}
                                setData={this.setTypeContract}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Regimen Pago"
                                idDialog="codigo"
                                titleDialog="Regimen de pago"
                                valueTextField={this.props.labelRegimenPagoLegajo}
                                dataList={this.props.regimenPago}
                                setData={this.setPaymentRegime}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Tipo Jornada"
                                idDialog="codigo"
                                titleDialog="Tipo de jornada"
                                valueTextField={this.props.labelTipoJornadaLegajo}
                                dataList={this.props.tipoJornada}
                                setData={this.setTypeWorkingDay}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Clase"
                                idDialog="idClase"
                                titleDialog="Clase"
                                valueTextField={this.props.labelClaseLegajo}
                                dataList={this.props.clase}
                                setData={this.setClass}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Convenio"
                                idDialog="codigoConvenio"
                                titleDialog="Convenio"
                                valueTextField={this.props.labelConvenioLegajo}
                                dataList={this.props.convenio}
                                setData={this.setAgreement}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Categoria"
                                idDialog="codigoCategoria"
                                titleDialog="Categoria"
                                valueTextField={this.props.labelCategoriaLegajo}
                                dataList={this.props.categoria}
                                setData={this.setCategory}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Sindicato"
                                idDialog="codigo"
                                titleDialog="Sindicato"
                                valueTextField={this.props.labelSindicatoLegajo}
                                dataList={this.props.sindicato}
                                setData={this.setLaborUnion}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="ocupacion"
                                    label="Ocupación"
                                    value={this.props.ocupacion}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="telefonoInterno"
                                    label="Teléfono Interno"
                                    value={this.props.telefonoInterno}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="horasMensuales"
                                    label="Horas Mensuales Trabajadas"
                                    value={this.props.horasMensuales}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="idSistemaRRHH"
                                    label="ID sistema RRHH"
                                    value={this.props.idSistemaRRHH}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroCredencial"
                                    label="No. De credencial"
                                    value={this.props.numeroCredencial}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="tipoCentroCostos"
                                    label="Tipo de Centro de costos"
                                    value={this.props.tipoCentroCostos}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Lugar Trabajo"
                                idDialog="codigo"
                                titleDialog="Lugar de trabajo"
                                valueTextField={this.props.labelLugarTrabajoLegajo}
                                dataList={this.props.lugarTrabajo}
                                setData={this.setWorkplace}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Clasificación Adicional 1"
                                idDialog="codigo"
                                titleDialog="Clasificacián adicional 1"
                                valueTextField={this.props.labelClasificacionAdicional1Legajo}
                                dataList={this.props.clasificacionAdicional1}
                                setData={this.setAdditionalClassification1}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Clasificación Adicional 2"
                                idDialog="codigo"
                                titleDialog="Clasificacián adicional 2"
                                valueTextField={this.props.labelClasificacionAdicional2Legajo}
                                dataList={this.props.clasificacionAdicional2}
                                setData={this.setAdditionalClassification2}
                            />
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Adicional 1"
                                onError={console.log}
                                value={this.props.fechaAdicional1}
                                onChange={this.handleDateChange.bind(this, 'fechaAdicional1')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Adicional 2"
                                onError={console.log}
                                value={this.props.fechaAdicional2}
                                onChange={this.handleDateChange.bind(this, 'fechaAdicional2')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="textoAdicional1"
                                    label="Texto Adicional 1"
                                    value={this.props.textoAdicional1}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="textoAdicional2"
                                    label="Texto Adicional 2"
                                    value={this.props.textoAdicional2}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="montoAdicional1"
                                    label="Monto Adicional 1"
                                    value={this.props.montoAdicional1}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="montoAdicional2"
                                    label="Monto Adicional2"
                                    value={this.props.montoAdicional2}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Jefe"
                                idDialog="idLegajo"
                                titleDialog="Jefe"
                                valueTextField={this.props.labelJefeLegajo}
                                dataList={this.props.jefe}
                                setData={this.setJefe}
                            />
                        </Grid>
                    </Grid>
                </FormGroup>
            </div>
        )
    }
}

CompanyData.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CompanyData)