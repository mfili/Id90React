import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import {Input, InputLabel } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {Tabs, Tab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import {List,  ListItem, ListItemIcon, ListItemText } from '@material-ui/core/List'
import { Link } from 'react-router-dom'
import store from '../../../store/store'
import { connect } from 'react-redux'
import DataDays from './DataDays.jsx'


var data= {}

const styles = theme => ({
    root: {
        paddingRight: 2,
    },
    tolbar: {
        position: 'relative'
    },
    tooltipTools: {
        position: 'absolute',
        right: '60px'
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
    },
    grid: {
        position: 'relative',
        marginLeft: '8vw',
        width: '80vw'
    },
    form: {
        padding: 0,
        height: '80vh',
        width: '90vw',
        marginTop: theme.spacing.unit * 3,
        marginLeft: '5vw',
        overflow:'auto'
    },
    formControl: {
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '3vw'
    },
    select: {
        width: '21vw',
        marginTop: '1em'
    },
    field: {
        width: '21vw'
    }
})

@connect((store) => {
    return {
        legajo: store.legajo.legajo,
        apellido: store.legajo.apellido,
        nombre: store.legajo.nombre,
        cuil: store.legajo.cuil,
        estado: store.legajo.descripcionEstado,
        saved: store.legajos.saved
    }
})

class Holiday extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 0,
            cuil: this.formatCuil(this.props.cuil),
            radioFecha: 'liquidacion',
            radioDias: 'diasNormales',
            mostrarRadio: 'none',
            camposDevengados: 'block'
        }
    }

    formatCuil = (cuil) => {
        if (cuil != '' && cuil.length > 1) {
            var inicio = cuil.substring(0, cuil.length )
            var cuilGuionInicial = ''
            var i = 0
            for (i = inicio.length; i >= 0; i--) {
                var numero = inicio.charAt(i)
                cuilGuionInicial = numero + cuilGuionInicial
                if(i == 2 ){
                    cuilGuionInicial = '-' + cuilGuionInicial 
                }

                if(i == inicio.length-1 ){
                    cuilGuionInicial = '-' + cuilGuionInicial 
                }
            }
        }
        return cuilGuionInicial
    }

    tabChange = (event, tab) => {
        this.setState({ tab });
        if (tab==1){
            this.setState({mostrarRadio:'inline-flex'})
        }else{
            this.setState({mostrarRadio:'none'})
        }
    }

    changeFecha = event => {
      this.setState({ radioFecha: event.target.value })
    }

    changeDias = event => {
      this.setState({ radioDias: event.target.value })
      if(event.target.value == 'diasAdicionales'){
        this.setState({camposDevengados: 'none'})
      }else{
        this.setState({camposDevengados: 'block'})
      }
    }

    render() {
        const { classes, theme } = this.props
        const { tab } = this.state;
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{"Legajo " + this.props.legajo + " " + this.props.apellido + " " + this.props.nombre + " " + this.state.cuil + " " + this.props.estado}</Typography>
                </Toolbar>
                <Grid container spacing={0}>
                    <Grid item xs={4} >
                        <FormControl component="fieldset" required className={classes.formControl}>
                            <FormControlLabel value="liquidacion" 
                            control={
                                <Radio
                                    checked={this.state.radioFecha === 'liquidacion'}
                                    onChange={this.changeFecha}
                                    value="liquidacion"
                                    name="radio-button-demo"
                                    aria-label="A fecha de liquidación"
                                />
                                } 
                                label="A fecha de liquidación" />
                            <FormControlLabel value="finAño" 
                            control={
                                <Radio
                                checked={this.state.radioFecha === 'finAño'}
                                onChange={this.changeFecha}
                                value="finAño"
                                name="radio-button-demo"
                                aria-label="A fin de año"
                                />
                            }
                            label="A fin de año" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} >
                        <FormControl component="fieldset" required className={classes.formControl}>
                            <FormControlLabel control={<Checkbox value="checkedC" />} label="Incluir vacaciones futuras cargadas" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} >
                        <FormControl component="fieldset" required className={classes.formControl}>
                            <FormControlLabel value="diasNormales" 
                                style={{display: this.state.mostrarRadio}}
                                control={
                                <Radio
                                    checked={this.state.radioDias === 'diasNormales'}
                                    onChange={this.changeDias}
                                    value="diasNormales"
                                    name="radio-button-demo"
                                />
                                } 
                                label="Dias Normales" />
                            <FormControlLabel value="diasAdicionales" 
                                style={{display: this.state.mostrarRadio}}
                                control={
                                <Radio
                                checked={this.state.radioDias === 'diasAdicionales'}
                                onChange={this.changeDias}
                                value="diasAdicionales"
                                name="radio-button-demo"
                                />
                            }
                            label="Dias Adicionales" />
                        </FormControl>
                    </Grid>
                </Grid>
                <AppBar className={classes.appBar} position="static">
                    <Tabs value={tab} onChange={this.tabChange}>
                        <Tab label="Cta cte dias PAGADOS" />
                        <Tab label="Cta cte dias GOZADOS" />
                    </Tabs>
                </AppBar>
                {tab === 0 && <DataDays mostrarTabsDias='block' camposDevengados={this.state.camposDevengados}/>}
                {tab === 1 && <DataDays mostrarTabsDias='none' camposDevengados={this.state.camposDevengados}/>}
            </form>
        )
    }
}

Holiday.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(Holiday))