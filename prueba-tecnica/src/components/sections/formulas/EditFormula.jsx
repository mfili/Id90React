import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
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
import { postFormula } from '../../../store/actions/formulas/formulasActions'
import { changeValue } from '../../../store/actions/formulas/formulaActions'

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
    field: {
        width: '21vw'
    }
})


@connect((store) => {
    return {
        idFormula: store.formula.idFormula,
        codigoFormula: store.formula.codigoFormula,
        descripcion: store.formula.descripcion,
        formula: store.formula.formula,
        saved: store.formulas.saved
    }
})

class EditFormula extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveFormula = this.saveFormula.bind(this)
        this.cancelFormula = this.cancelFormula.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    saveFormula = () => {
        var data = {}
        data = {
            "idFormula": this.props.idFormula,
            "codigoFormula": this.props.codigoFormula,
            "descripcion": this.props.descripcion,
            "formula": this.props.formula
        }
        store.dispatch(postFormula(data))
    }
    
    cancelFormula = () => {
        const { history } = this.props
        history.push('/formulas')
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/formulas')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.codigoFormula + '-' + this.props.descripcion}</Typography>
                    <Tooltip title="Save">
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveFormula()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelFormula()}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <div className={classes.divGlobal}>
                    <FormGroup >
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="codigoFormula"
                                        label="Código de Formula"
                                        value={this.props.codigoFormula}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="descripcion"
                                        label="Descripción"
                                        value={this.props.descripcion}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.textarea}>
                                    <TextField 
                                        id="formula"
                                        label="Formula"
                                        multiline
                                        rows="2"
                                        rowsMax="4"
                                        defaultValue={this.props.formula}
                                        onChange={this.handleValueChange}
                                        margin="normal"
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

EditFormula.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditFormula))