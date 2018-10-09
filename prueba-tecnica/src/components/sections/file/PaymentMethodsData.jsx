import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import DatePicker from 'material-ui-pickers/DatePicker'
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
import { saveWayToPay1, saveWayToPay2, saveBank1, saveBank2, changeValue } from '../../../store/actions/files/fileActions'
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
    var formaPago1Label = lodash.find(store.formaPago.formaPago, { codigo: '' + store.legajo.idFormaPago1 })
    var bancoPago1Label = lodash.find(store.banco.banco, { codigo: '' + store.legajo.idBancoPago1 })
    var formaPago2Label = lodash.find(store.formaPago.formaPago, { codigo: '' + store.legajo.idFormaPago2 })
    var bancoPago2Label = lodash.find(store.banco.banco, { codigo: '' + store.legajo.idBancoPago2 })
    return {
        formaPago: store.formaPago.formaPago,
        idFormaPago1FormaPago1: store.formaPago.idFormaPago1,
        idFormaPago1Legajo: store.legajo.idFormaPago1,
        labelFormaPago1FormaPago1: store.formaPago.labelFormaPago1,
        labelFormaPago1Legajo: formaPago1Label ? formaPago1Label.codigo + '-' + formaPago1Label.descripcion : '',
        porcentajePago1: store.legajo.porcentajePago1,
        cbuPago1: store.legajo.cbuPago1,
        banco: store.banco.banco,
        idBancoPago1BancoPago1: store.banco.idBancoPago1,
        idBancoPago1Legajo: store.legajo.idBancoPago1,
        labelBancoPago1BancoPago1: store.banco.labelBancoPago1,
        labelBancoPago1Legajo: bancoPago1Label ? bancoPago1Label.codigo + '-' + bancoPago1Label.descripcion : '',
        nroCuentaPago1: store.legajo.nroCuentaPago1,
        idFormaPago2FormaPago2: store.formaPago.idFormaPago2,
        idFormaPago2Legajo: store.legajo.idFormaPago2,
        labelFormaPago2FormaPago2: store.formaPago.labelFormaPago2,
        labelFormaPago2Legajo: formaPago2Label ? formaPago2Label.codigo + '-' + formaPago2Label.descripcion : '',
        porcentajePago2: store.legajo.porcentajePago2,
        cbuPago2: store.legajo.cbuPago2,
        idBancoPago2BancoPago2: store.banco.idBancoPago2,
        idBancoPago2Legajo: store.legajo.idBancoPago2,
        labelBancoPago2BancoPago2: store.banco.labelBancoPago2,
        labelBancoPago2Legajo: bancoPago2Label ? bancoPago2Label.codigo + '-' + bancoPago2Label.descripcion : '',
        nroCuentaPago2: store.legajo.nroCuentaPago2,
        fechaInicialVacaciones: store.legajo.fechaInicialVacaciones,
        diasBaseVacaciones: store.legajo.diasBaseVacaciones,
        diasAjusteVacaciones: store.legajo.diasAjusteVacaciones
    }
})

class PaymentMethodsData extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id ? event.target.id : event.target.name, event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, new Date(date)))
    }

    setWayToPay1(id, value) {
        store.dispatch(saveWayToPay1(id, value))
    }

    setWayToPay2(id, value) {
        store.dispatch(saveWayToPay2(id, value))
    }

    setBank1(id, value) {
        store.dispatch(saveBank1(id, value))
    }

    setBank2(id, value) {
        store.dispatch(saveBank2(id, value))
    }
    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.divGlobal}>
                <FormGroup >
                    <Grid container spacing={0}>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Forma de Pago1"
                                idDialog="codigo"
                                titleDialog="Forma de pago 1"
                                valueTextField={this.props.labelFormaPago1Legajo}
                                dataList={this.props.formaPago}
                                setData={this.setWayToPay1}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="porcentajePago1"
                                    label="% forma de pago 1"
                                    value={this.props.porcentajePago1}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="cbuPago1"
                                    label="CBU forma de pago 1"
                                    value={this.props.cbuPago1}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Banco de Pago1"
                                idDialog="codigo"
                                titleDialog="Banco de pago 1"
                                valueTextField={this.props.labelBancoPago1Legajo}
                                dataList={this.props.banco}
                                setData={this.setBank1}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="nroCuentaPago1"
                                    label="No. De cuenta forma de pago 1"
                                    value={this.props.nroCuentaPago1}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Forma de Pago2"
                                idDialog="codigo"
                                titleDialog="Forma de pago 2"
                                valueTextField={this.props.labelFormaPago2Legajo}
                                dataList={this.props.formaPago}
                                setData={this.setWayToPay2}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="porcentajePago2"
                                    label="% forma de pago 2"
                                    value={this.props.porcentajePago2}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="cbuPago2"
                                    label="CBU forma de pago 2"
                                    value={this.props.cbuPago2}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Banco de Pago2"
                                idDialog="codigo"
                                titleDialog="Banco de pago 2"
                                valueTextField={this.props.labelBancoPago2Legajo}
                                dataList={this.props.banco}
                                setData={this.setBank2}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="nroCuentaPago2"
                                    label="No. De cuenta forma de pago 2"
                                    value={this.props.nroCuentaPago2}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Forma de Pago1"
                                idDialog="codigo"
                                titleDialog="Forma de pago 1"
                                valueTextField={this.props.labelFormaPago1Legajo}
                                dataList={this.props.formaPago}
                                setData={this.setWayToPay1}
                            />
                        </Grid>
                        <Grid item xs={3}>
                                <DatePicker style={{
                                    width: '19vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Fecha Inicial Vacaciones"
                                onError={console.log}
                                value={this.props.fechaInicialVacaciones}
                                onChange={this.handleDateChange.bind(this, 'fechaInicialVacaciones')}
                                format="YYYY-MM-DD"
                                />
                        </Grid>
                        <Grid item xs={3}>
                            <ComponentAutocomplete
                                labelDialog="Forma de Pago1"
                                idDialog="codigo"
                                titleDialog="Forma de pago 1"
                                valueTextField={this.props.labelFormaPago1Legajo}
                                dataList={this.props.formaPago}
                                setData={this.setWayToPay1}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="diasBaseVacaciones"
                                    type="number"
                                    label="Dias base de vacaciones"
                                    value={this.props.diasBaseVacaciones}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="diasAjusteVacaciones"
                                    type="number"
                                    label="Dias iniciales de ajuste"
                                    value={this.props.diasAjusteVacaciones}
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

PaymentMethodsData.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(PaymentMethodsData)