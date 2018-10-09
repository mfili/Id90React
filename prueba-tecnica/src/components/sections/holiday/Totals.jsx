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
import Tabs, { Tab } from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { postHoliday } from '../../../store/actions/holiday/holidaysActions'
import { changeValue } from '../../../store/actions/holiday/holidayActions'
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
        padding: 0
    },
    typography:{
        fontSize:'1.5em',
    },
    appBar: {
        width: '42vw',
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
        width: '30vw'
    },
    form: {
        width: '43vw',
        margin: '0',
        padding: 0,
        height: '30vw'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        marginTop: '1em'
    },
    field: {
        width: '10vw'
    },
})


@connect((store) => {
    var total = 15 + 12 + 0
    return {
        anuales: 15,
        proporcionales: 12,
        adicionales: 0,
        total: total,
        diasTomados: 7,
        diasPendientes:20
    }
})

class Totales extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveHoliday = this.saveHoliday.bind(this)
        this.cancelHoliday = this.cancelHoliday.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    saveHoliday = () => {
        var data = {}
        data = {
        }
        store.dispatch(postHoliday(data))
    }
    
    cancelHoliday = () => {
        const { history } = this.props
        history.push('/vacaciones')
    }

    render() {
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <div className={classes.divGlobal}>
                    <Toolbar className={classes.tolbar}>
                        <Typography className={classes.typography} type="title">Días Devengados</Typography>
                    </Toolbar>
                    <FormGroup >
                        <Grid container spacing={0}>
                            <Grid item xs={4} >
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="anuales"
                                        label="Anuales"
                                        type="number"
                                        value={this.props.anuales}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid style={{display:this.props.camposDevengados}} item xs={4} >
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="proporcionales"
                                        label="Proporcionales"
                                        type="number"
                                        value={this.props.proporcionales}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid style={{display:this.props.camposDevengados}} item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="adicionales"
                                        label="Adicionales"
                                        type="number"
                                        value={this.props.adicionales}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="total"
                                        label="Total"
                                        type="number"
                                        value={this.props.total}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <Toolbar className={classes.tolbar}>
                        <Typography className={classes.typography} type="title">Días Tomados</Typography>
                    </Toolbar>
                    <FormGroup >
                        <Grid container spacing={0}>
                            <Grid item xs={4} >
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="diasTomados"
                                        label="Días tomados"
                                        type="number"
                                        value={this.props.diasTomados}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <Toolbar className={classes.tolbar}>
                        <Typography className={classes.typography} type="title">Días Pendientes</Typography>
                    </Toolbar>
                    <FormGroup >
                        <Grid container spacing={0}>
                            <Grid item xs={4} >
                                <DatePicker style={{
                                    width: '10vw',
                                    marginTop: '1em'}}
                                keyboard
                                label="Saldado al"
                                onError={console.log}
                                value={this.props.saldado}
                                onChange={this.handleDateChange.bind(this, 'saldado')}
                                format="YYYY-MM-DD"
                                />
                            </Grid>
                            <Grid item xs={4} >
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="diasPendientes"
                                        label="Días pendientes"
                                        type="number"
                                        value={this.props.diasPendientes}
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

Totales.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object,
    camposDevengados: PropTypes.string
}

export default  withRouter(withStyles(styles)(Totales))