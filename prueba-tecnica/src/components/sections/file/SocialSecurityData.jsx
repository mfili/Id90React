import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import DatePicker from 'material-ui-pickers/DatePicker'
import Typography from '@material-ui/core/Typography'
import { Input, InputLabel } from '@material-ui/core'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import { Dialog,
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
import { changeValue, 
    saveSocialWork, 
    saveSocialWorkPlan, 
    saveTypeAgreement, 
    saveEmploymentSituation, 
    saveModalityContracting, 
    saveActivityCode, 
    saveGeographicalArea, 
    saveGeographicalAreaFM } from '../../../store/actions/files/fileActions'
import { fetchPlanSocialWorkList } from '../../../store/actions/socialWork/socialWorkPlan/socialWorkPlansActions'
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
    var tipoAcuerdoLabel = lodash.find(store.tipoAcuerdo.tipoAcuerdo,{codigo:''+ store.legajo.idTipoAcuerdo})
    var situacionLaboralLabel = lodash.find(store.tipoAcuerdo.tipoAcuerdo,{codigo:''+ store.legajo.idTipoAcuerdo})
    var modalidadContratacionLabel = lodash.find(store.modalidadContratacion.modalidadContratacion,{codigo:''+ store.legajo.idModalidadContratacion})
    var codigoActividadLabel = lodash.find(store.codigoActividad.codigoActividad,{codigo:''+ store.legajo.idCodigoActividad})
    var zonaGeograficaLabel = lodash.find(store.zonaGeografica.zonaGeografica,{codigo:''+ store.legajo.idZonaGeografica})
    var zonaGeograficaFMLabel = lodash.find(store.zonaGeograficaFM.zonaGeograficaFM,{codigo:''+ store.legajo.idZonaGeograficaFM})
   return {
        jubilado: 'Si',
        obraSocial: store.obrasSociales.obrasSociales,
        codigoObraSocial: store.legajo.codigoObraSocial,
        labelObraSocialLegajo: store.legajo.labelObraSocial,
        planObraSocial: store.planesObraSocial.planesObraSocial,
        codigoPlanObraSocialPlanObraSocial: store.planObraSocial.codigoPlanObraSocial,
        codigoPlanObraSocialLegajo: store.legajo.codigoPlanObraSocial,
        labelPlanObraSocialPlanObraSocial: store.planObraSocial.labelPlanObraSocial,
        labelPlanObraSocialLegajo: store.legajo.labelPlanObraSocial,
        afiliadoOS: store.legajo.afiliadoOS,
        tipoAcuerdo: store.tipoAcuerdo.tipoAcuerdo,
        idTipoAcuerdoTipoAcuerdo: store.tipoAcuerdo.idTipoAcuerdo,
        idTipoAcuerdoLegajo: store.legajo.idTipoAcuerdo,
        labelTipoAcuerdoTipoAcuerdo: store.tipoAcuerdo.labelTipoAcuerdo,
        labelTipoAcuerdoLegajo: tipoAcuerdoLabel?tipoAcuerdoLabel.codigo + '-' + tipoAcuerdoLabel.descripcion:'',
        topeOS: store.legajo.topeOS,
        fechaIngresoOS: store.legajo.fechaIngresoOS,
        fechaVencimientoOS: store.legajo.fechaVencimientoOS,
        estado: store.estado.estado,
        situacionLaboral: store.situacionLaboral.situacionLaboral,
        idSituacionLaboralSituacionLaboral: store.situacionLaboral.idSituacionLaboral,
        idSituacionLaboralLegajo: store.legajo.idSituacionLaboral,
        labelSituacionLaboralSituacionLaboral: store.situacionLaboral.labelSituacionLaboral,
        labelSituacionLaboralLegajo: situacionLaboralLabel?situacionLaboralLabel.codigo + '-' + situacionLaboralLabel.descripcion:'',
        modalidadContratacion: store.modalidadContratacion.modalidadContratacion,
        idModalidadContratacionModalidadContratacion: store.modalidadContratacion.idModalidadContratacion,
        idModalidadContratacionLegajo: store.legajo.idModalidadContratacion,
        labelModalidadContratacionModalidadContratacion: store.modalidadContratacion.labelModalidadContratacion,
        labelModalidadContratacionLegajo: modalidadContratacionLabel?modalidadContratacionLabel.codigo + '-' + modalidadContratacionLabel.descripcion:'',
        codigoActividad: store.codigoActividad.codigoActividad,
        idCodigoActividadCodigoActividad: store.codigoActividad.idCodigoActividad,
        idCodigoActividadLegajo: store.legajo.idCodigoActividad,
        labelCodigoActividadCodigoActividad: store.codigoActividad.labelCodigoActividad,
        labelCodigoActividadLegajo: codigoActividadLabel?codigoActividadLabel.codigo + '-' + codigoActividadLabel.descripcion:'',
        zonaGeografica: store.zonaGeografica.zonaGeografica,
        idZonaGeograficaZonaGeografica: store.zonaGeografica.idZonaGeografica,
        idZonaGeograficaLegajo: store.legajo.idZonaGeografica,
        labelZonaGeograficaZonaGeografica: store.zonaGeografica.labelZonaGeografica,
        labelZonaGeograficaLegajo: zonaGeograficaLabel?tipoAcuerdoLabel.codigo + '-' + zonaGeograficaLabel.descripcion:'',
        zonaGeograficaFM: store.zonaGeograficaFM.zonaGeograficaFM,
        idZonaGeograficaFMZonaGeograficaFM: store.zonaGeograficaFM.idZonaGeograficaFM,
        idZonaGeograficaFMLegajo: store.legajo.idZonaGeograficaFM,
        labelZonaGeograficaFMZonaGeograficaFM: store.zonaGeograficaFM.labelZonaGeograficaFM,
        labelZonaGeograficaFMLegajo: zonaGeograficaFMLabel?zonaGeograficaFMLabel.codigo + '-' + zonaGeograficaFMLabel.descripcion:'',
    }
})

class SocialSecurityData extends Component {
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
      
    setSocialWork(id, value){
        store.dispatch(saveSocialWork(id, value))
        store.dispatch(fetchPlanSocialWorkList(id))
    }
    
    setSocialWorkPlan(id, value){
        store.dispatch(saveSocialWorkPlan(id, value))
    }
    
    setTypeAgreement(id, value){
        store.dispatch(saveTypeAgreement(id, value))
    }
    
    setEmploymentSituation(id, value){
        store.dispatch(saveEmploymentSituation(id, value))
    }
    
    setModalityContracting(id, value){
        store.dispatch(saveModalityContracting(id, value))
    }
    
    setActivityCode(id, value){
        store.dispatch(saveActivityCode(id, value))
    }
    
    setGeographicalArea(id, value){
        store.dispatch(saveGeographicalArea(id, value))
    }
    
    setGeographicalAreaFM(id, value){
        store.dispatch(saveGeographicalAreaFM(id, value))
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
                                    id="jubilado"
                                    label="¿Jubilado?"
                                    value={this.props.jubilado}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="ObraSocial"
                                idDialog="codigoObraSocial"
                                titleDialog="Obra social"
                                valueTextField={this.props.labelObraSocialLegajo}
                                dataList={this.props.obraSocial}
                                setData={this.setSocialWork}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Plan Obra Social"
                                idDialog="codigoPlanObraSocial"
                                titleDialog="Plan obra social"
                                valueTextField={this.props.labelPlanObraSocialLegajo}
                                dataList={this.props.planObraSocial}
                                setData={this.setSocialWorkPlan}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="afiliadoOS"
                                    label="No. Afiliado OS"
                                    value={this.props.afiliadoOS}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Tipo Acuerdo"
                                idDialog="codigo"
                                titleDialog="Tipo de acuerdo"
                                valueTextField={this.props.labelTipoAcuerdoLegajo}
                                dataList={this.props.tipoAcuerdo}
                                setData={this.setTypeAgreement}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="topeOS"
                                    label="Monto tope OS"
                                    value={this.props.topeOS}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Ingreso plan  OS"
                                onError={console.log}
                                value={this.props.fechaIngresoOS}
                                onChange={this.handleDateChange.bind(this, 'fechaIngresoOS')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Vencimiento plan OS"
                                onError={console.log}
                                value={this.props.fechaVencimientoOS}
                                onChange={this.handleDateChange.bind(this, 'fechaVencimientoOS')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Situacion Laboral"
                                idDialog="codigo"
                                titleDialog="Situacion laboral"
                                valueTextField={this.props.labelSituacionLaboralLegajo}
                                dataList={this.props.situacionLaboral}
                                setData={this.setEmploymentSituation}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Modalidad Contratacion"
                                idDialog="codigo"
                                titleDialog="Modalidad de contratación"
                                valueTextField={this.props.labelModalidadContratacionLegajo}
                                dataList={this.props.modalidadContratacion}
                                setData={this.setModalityContracting}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Código Actividad"
                                idDialog="codigo"
                                titleDialog="Código de actividad"
                                valueTextField={this.props.labelCodigoActividadLegajo}
                                dataList={this.props.codigoActividad}
                                setData={this.setActivityCode}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Zona Geográfica"
                                idDialog="codigo"
                                titleDialog="Zona geográfica"
                                valueTextField={this.props.labelZonaGeograficaLegajo}
                                dataList={this.props.zonaGeografica}
                                setData={this.setGeographicalArea}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete 
                                labelDialog="Zona Geográfica Familiar"
                                idDialog="codigo"
                                titleDialog="Zona geográfica familiar"
                                valueTextField={this.props.labelZonaGeograficaFMLegajo}
                                dataList={this.props.zonaGeograficaFM}
                                setData={this.setGeographicalAreaFM}
                            />
                        </Grid>
                    </Grid>
                </FormGroup>
            </div>
        )
    }
}

SocialSecurityData.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SocialSecurityData)