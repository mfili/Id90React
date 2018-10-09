import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {Input, InputLabel } from '@material-ui/core'
import {FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
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
import Accumulators from './Accumulators.jsx'
import Formula from './Formula.jsx'
import { changeValue, saveFormula } from '../../../store/actions/concepts/conceptActions'

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
        width: '21vw',
        marginTop: '1em'
    },
    field: {
        width: '21vw'
    },
    dialog: {
        overflowY: 'hidden'
    }
})

@connect((store) => {
    var lodash = require('lodash')
    var formulaLabel = lodash.find(store.formulas.formulas,{codigoFormula:''+ store.concept.formulaCode})

    return {
        codigoConcepto: store.concept.codigo,
        descripcion: store.concept.descripcion,
        tipos: store.conceptTypes.conceptTypes,
        tipo: store.concept.tipo,
        formulaCodeFormula: store.formula.codigoFormula,
        formulaCode: store.concept.formulaCode,
        formulaLabel: formulaLabel?formulaLabel.codigoFormula + '-' + formulaLabel.descripcion:'',
        orden: store.concept.orden,
        profitsClassifications: store.profitsClassifications.profitsClassifications,
        profitsClassification: store.concept.profitsClassification,
        conceptualClassifications: store.conceptualClassifications.conceptualClassifications,
        conceptualClassification: store.concept.conceptualClassification,
        porcex: store.concept.porcex
    }
})

class BasicConfiguration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openFormula: false,
            acumuladores: this.props.accumulators,
            accumulator: this.props.accumulator,
            multi: null
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.openFormulaDialog = this.openFormulaDialog.bind(this)
        this.aceptFormulaDialog = this.aceptFormulaDialog.bind(this)
        this.closeFormulaDialog = this.closeFormulaDialog.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    createTypeMenuItem() {
        var items = []
        if (this.props.tipos) {
            for (var i = 0; i < this.props.tipos.length; i++) {
                items.push(
                    <MenuItem key={this.props.tipos[i].idTipoConcepto} value={this.props.tipos[i].idTipoConcepto}>{this.props.tipos[i].descripcion}</MenuItem>
                )
            }
        }
        return items
    }

    createProfitsClassificationMenuItem() {
        var items = []
        if (this.props.profitsClassifications) {
            for (var i = 0; i < this.props.profitsClassifications.length; i++) {
                items.push(
                    <MenuItem key={this.props.profitsClassifications[i].idClasificacionGanancias} value={this.props.profitsClassifications[i].idClasificacionGanancias}>{this.props.profitsClassifications[i].descripcion}</MenuItem>
                )
            }
        }
        return items
    }

    createConceptualClassificationMenuItem() {
        var items = []
        if (this.props.conceptualClassifications) {
            for (var i = 0; i < this.props.conceptualClassifications.length; i++) {
                items.push(
                    <MenuItem key={this.props.conceptualClassifications[i].idClasificacionConceptual} value={this.props.conceptualClassifications[i].idClasificacionConceptual}>{this.props.conceptualClassifications[i].descripcion}</MenuItem>
                )
            }
        }
        return items
    }

    openFormulaDialog(){
        this.setState({ openFormula: true })
    }

    closeFormulaDialog = () => {
        this.setState({ openFormula: false })
    }

    aceptFormulaDialog(){
        store.dispatch(saveFormula(this.props.formulaCodeFormula?this.props.formulaCodeFormula:this.props.formulaCode))
        this.closeFormulaDialog()
    }

    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.divGlobal}>
                <FormGroup >
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="codigo"
                                    label="Código de Concepto"
                                    value={this.props.codigoConcepto}
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
                                <InputLabel htmlFor="name" >Tipo de concepto</InputLabel>
                                <Select className={classes.select}
                                    value={this.props.tipo}
                                    onChange={this.handleValueChange}
                                    name="tipo"
                                >
                                    <MenuItem value={0}>
                                        <em>Tipo de concepto</em>
                                    </MenuItem>
                                    {this.createTypeMenuItem()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="orden"
                                    label="Orden"
                                    type="number"
                                    value={this.props.orden}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="formulaCode"
                                    label="Código Formula"
                                    value={this.props.formulaLabel}
                                    onChange={this.handleValueChange}
                                    onClick={this.openFormulaDialog}
                                />
                                <Dialog
                                    open={this.state.openFormula}
                                    onClose={this.closeFormulaDialog}
                                    style={{overflowY: 'hidden'}}
                                >
                                    <DialogTitle id="alert-dialog-title">{"Seleccione la fórmula"}</DialogTitle>
                                    <DialogContent 
                                    className={classes.dialog}>
                                        <Formula/>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={this.closeFormulaDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={this.aceptFormulaDialog} color="primary" autoFocus>
                                        Aceptar
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="name" >Clasificación Conceptual</InputLabel>
                                <Select className={classes.select}
                                    value={this.props.conceptualClassification}
                                    onChange={this.handleValueChange}
                                    name="conceptualClassification"
                                >
                                    <MenuItem value={0} >
                                        <em>Clasificación Conceptual</em>
                                    </MenuItem>
                                    {this.createConceptualClassificationMenuItem()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="name" >Clasificación Ganancias</InputLabel>
                                <Select className={classes.select}
                                    value={this.props.profitsClassification}
                                    onChange={this.handleValueChange}
                                    name="profitsClassification" 
                                >
                                    <MenuItem value={0} >
                                        <em>Clasificación Ganancias</em>
                                    </MenuItem>
                                    {this.createProfitsClassificationMenuItem()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="porcex"
                                    value={this.props.porcex}
                                    label="Porcentaje Exención"
                                    type="number"
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Accumulators />
                        </Grid>
                    </Grid>
                </FormGroup>
            </div>
        )
    }
}

BasicConfiguration.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(BasicConfiguration)