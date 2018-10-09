import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DatePicker from 'material-ui-pickers/DatePicker'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import {  Input, InputLabel } from '@material-ui/core'
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
import {
    changeValue,
    saveDocumentType,
    saveCivilStatus,
    saveNationality,
    saveEducationalLevel,
    saveDegrees,
    saveProfession,
    saveLanguage
} from '../../../store/actions/files/fileActions'
import ComponentDialog from './ComponentDialog.jsx'
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
    datePiker: {
        width: '19vw',
        marginTop: '1em'
    },
    dialog: {
        overflowY: 'hidden'
    }
})

@connect((store) => {
    var lodash = require('lodash')
    var tipoDocumentoLabel = lodash.find(store.tipoDocumento.tipoDocumento, { codigo: '' + store.legajo.idTipoDocumento })
    var nacionalidadLabel = lodash.find(store.nacionalidad.nacionalidad, { codigo: '' + store.legajo.idNacionalidad })
    var nivelEstudiosLabel = lodash.find(store.nivelEstudios.nivelEstudios, { codigo: '' + store.legajo.idNivelEstudios })
    var tituloLabel = lodash.find(store.titulo.titulo, { codigo: '' + store.legajo.idTitulo })
    var idiomaLabel = lodash.find(store.idioma.idioma, { codigo: '' + store.legajo.idIdioma })
    return {
        tipoDocumento: store.tipoDocumento.tipoDocumento,
        idTipoDocumentoTipoDocumento: store.tipoDocumento.idTipoDocumento,
        idTipoDocumentoLegajo: store.legajo.idTipoDocumento,
        labelTipoDocumentoTipoDocumento: store.tipoDocumento.labelTipoDocumento,
        labelTipoDocumentoLegajo: tipoDocumentoLabel ? tipoDocumentoLabel.codigo + '-' + tipoDocumentoLabel.descripcion : '',
        numeroDocumento: store.legajo.numeroDocumento,
        fechaNacimiento: store.legajo.fechaNacimiento,
        estadoCivil: store.estadoCivil.estadoCivil,
        idEstadoCivilEstadoCivil: store.estadoCivil.idEstadoCivil,
        civilStatusIdlegajo: store.legajo.idEstadoCivil,
        labelEstadoCivilEstadoCivil: store.estadoCivil.labelEstadoCivil,
        labelEstadoCivilLegajo: store.legajo.labelEstadoCivil,
        sexo: store.legajo.sexo,
        direccion1: store.legajo.direccion1,
        direccion2: store.legajo.direccion2,
        direccion3: store.legajo.direccion3,
        telefonoFijo: store.legajo.telefonoFijo,
        celular: store.legajo.celular,
        email: store.legajo.email,
        nacionalidad: store.nacionalidad.nacionalidad,
        idNacionalidadNacionalidad: store.nacionalidad.idNacionalidad,
        idNacionalidadLegajo: store.legajo.idNacionalidad,
        labelNacionalidadNacionalidad: store.nacionalidad.labelNacionalidad,
        labelNacionalidadLegajo: nacionalidadLabel ? nacionalidadLabel.codigo + '-' + nacionalidadLabel.descripcion : '',
        nivelEstudios: store.nivelEstudios.nivelEstudios,
        idNivelEstudiosNivelEstudios: store.nivelEstudios.idNivelEstudios,
        idNivelEstudiosLegajo: store.legajo.idNivelEstudios,
        labelNivelEstudiosNivelEstudios: store.nivelEstudios.labelNivelEstudios,
        labelNivelEstudiosLegajo: nivelEstudiosLabel ? nivelEstudiosLabel.codigo + '-' + nivelEstudiosLabel.descripcion : '',
        titulo: store.titulo.titulo,
        idTituloTitulo: store.titulo.idTitulo,
        idTituloLegajo: store.legajo.idTitulo,
        labelTituloTitulo: store.titulo.labelTitulo,
        labelTituloLegajo: tituloLabel ? tituloLabel.codigo + '-' + tituloLabel.descripcion : '',
        profesion: store.profesion.profesion,
        idProfesionProfesion: store.profesion.idProfesion,
        idProfesionLegajo: store.legajo.idProfesion,
        labelProfesionProfesion: store.profesion.labelProfesion,
        labelProfesionLegajo: store.legajo.labelProfesion,
        idioma: store.idioma.idioma,
        idIdiomaIdioma: store.idioma.idIdioma,
        idIdiomaLegajo: store.legajo.idIdioma,
        labelIdiomaIdioma: store.idioma.labelIdioma,
        labelIdiomaLegajo: idiomaLabel ? idiomaLabel.codigo + '-' + idiomaLabel.descripcion : '',
        numeroRegistro: store.legajo.numeroRegistro,
        fechaVencimientoRegistro: store.legajo.fechaVencimientoRegistro,
        tallaRopa: store.legajo.tallaRopa,
        tallaZapatos: store.legajo.tallaZapatos
    }
})

class PersonalData extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id ? event.target.id : event.target.name, event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, new Date(date)))
    }

    setDocumentType(id, value) {
        store.dispatch(saveDocumentType(id, value))
    }

    setCivilStatus(id, value) {
        store.dispatch(saveCivilStatus(id, value))
    }

    setNationality(id, value) {
        store.dispatch(saveNationality(id, value))
    }

    setEducationalLevel(id, value) {
        store.dispatch(saveEducationalLevel(id, value))
    }

    setDegrees(id, value) {
        store.dispatch(saveDegrees(id, value))
    }

    setProfession(id, value) {
        store.dispatch(saveProfession(id, value))
    }

    setLanguage(id, value) {
        store.dispatch(saveLanguage(id, value))
    }

    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.divGlobal}>
                <FormGroup >
                    <Grid container spacing={0}>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Tipo de Documento"
                                idDialog="codigo"
                                titleDialog="Tipo de documento"
                                valueTextField={this.props.labelTipoDocumentoLegajo}
                                dataList={this.props.tipoDocumento}
                                setData={this.setDocumentType}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroDocumento"
                                    label="Número de Documento"
                                    value={this.props.numeroDocumento}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} >
                            <DatePicker style={{
                                width: '19vw',
                                marginTop: '1em'}}
                            keyboard
                            label="Fecha de nacimiento"
                            onError={console.log}
                            value={this.props.fechaNacimiento}
                            onChange={this.handleDateChange.bind(this, 'fechaNacimiento')}
                            format="YYYY-MM-DD"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Estado Civil"
                                idDialog="idEstadoCivil"
                                titleDialog="Estado civil"
                                valueTextField={this.props.labelEstadoCivilLegajo}
                                dataList={this.props.estadoCivil}
                                setData={this.setCivilStatus}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="sexo"
                                    label="Sexo"
                                    value={this.props.sexo}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="direccion1"
                                    label="Dirección 1"
                                    value={this.props.direccion1}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="direccion2"
                                    label="Dirección 2"
                                    value={this.props.direccion2}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="direccion3"
                                    label="Dirección 3"
                                    value={this.props.direccion3}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="telefonoFijo"
                                    label="Teléfono"
                                    value={this.props.telefonoFijo}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="celular"
                                    label="Celular"
                                    value={this.props.celular}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="email"
                                    label="Email"
                                    value={this.props.email}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Nacionalidad"
                                idDialog="codigo"
                                titleDialog="Nacionalidad"
                                valueTextField={this.props.labelNacionalidadLegajo}
                                dataList={this.props.nacionalidad}
                                setData={this.setNationality}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Nivel de estudios"
                                idDialog="codigo"
                                titleDialog="Nivel de estudios"
                                valueTextField={this.props.labelNivelEstudiosLegajo}
                                dataList={this.props.nivelEstudios}
                                setData={this.setEducationalLevel}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Titulo"
                                idDialog="codigo"
                                titleDialog="Titulo"
                                valueTextField={this.props.labelTituloLegajo}
                                dataList={this.props.titulo}
                                setData={this.setDegrees}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Profesión"
                                idDialog="idProfesion"
                                titleDialog="Profesión"
                                valueTextField={this.props.labelProfesionLegajo}
                                dataList={this.props.profesion}
                                setData={this.setProfession}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Idioma"
                                idDialog="codigo"
                                titleDialog="Idioma"
                                valueTextField={this.props.labelIdiomaLegajo}
                                dataList={this.props.idioma}
                                setData={this.setLanguage}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroRegistro"
                                    label="Número de registro"
                                    value={this.props.numeroRegistro}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Vencimiento Registro"
                                onError={console.log}
                                value={this.props.fechaVencimientoRegistro}
                                onChange={this.handleDateChange.bind(this, 'fechaVencimientoRegistro')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="tallaRopa"
                                    label="Talle de ropa"
                                    value={this.props.tallaRopa}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="tallaZapatos"
                                    label="Talle de zapatos"
                                    value={this.props.tallaZapatos}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormGroup>
            </div>
        )
    }
}

PersonalData.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(PersonalData)