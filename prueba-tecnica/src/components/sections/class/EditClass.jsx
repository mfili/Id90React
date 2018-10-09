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
import {Tabs,  Tab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { postClass } from '../../../store/actions/class/classesActions'
import { changeValue } from '../../../store/actions/class/classActions'
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
    return {
        descripcion:store.clase.descripcion,
        idClase:store.clase.idClase,
        saved: store.clases.saved
    }
})

class EditClass extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveClass = this.saveClass.bind(this)
        this.cancelClass = this.cancelClass.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    saveClass = () => {
        var data = {}
        data = {
            "idClase": this.props.idClase,
            "descripcion": this.props.descripcion
        }
        store.dispatch(postClass(data))
    }
    
    cancelClass = () => {
        const { history } = this.props
        history.push('/clase')
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/clase')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.idClase? this.props.idClase + '-' + this.props.descripcion:'[Id]-[Clase]'}</Typography>
                    <Tooltip title="Save">
                        <IconButton  className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveClass()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelClass()}>
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
                                        id="descripcion"
                                        label="Descripción"
                                        value={this.props.descripcion}
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

EditClass.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditClass))