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
import { postSocialWork } from '../../../store/actions/socialWork/socialWorksActions'
import { changeValue } from '../../../store/actions/socialWork/socialWorkActions'

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
        codigoObraSocial: store.obraSocial.codigoObraSocial,
        descripcion: store.obraSocial.descripcion,
        saved: store.obrasSociales.saved
    }
})

class EditSocialWork extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveSocialWork = this.saveSocialWork.bind(this)
        this.cancelSocialWork = this.cancelSocialWork.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    saveSocialWork = () => {
        var data = {}
        data = {
            "codigoObraSocial": this.props.codigoObraSocial,
            "descripcion": this.props.descripcion
        }
        store.dispatch(postSocialWork(data))
    }
    
    cancelSocialWork = () => {
        const { history } = this.props
        history.push('/obraSocial')
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/obraSocial')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.codigoObraSocial?this.props.codigoObraSocial + '-' + this.props.descripcion:'[Codigo Obra Social]-[Descripción]'}</Typography>
                    <Tooltip title="Save" className={classes.tooltipSave}>
                        <IconButton aria-label="Save" onClick={event => this.saveSocialWork()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" className={classes.tooltipCancel}>
                        <IconButton aria-label="Cancel" onClick={event => this.cancelSocialWork()}>
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
                                        id="codigoObraSocial"
                                        label="Codigo Obra Social"
                                        type="number"
                                        value={this.props.codigoObraSocial}
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
                        </Grid>
                    </FormGroup>
                </div>
            </form>
        )
    }
}

EditSocialWork.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditSocialWork))