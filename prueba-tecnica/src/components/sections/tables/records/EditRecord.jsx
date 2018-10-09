import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../../store/store'
import { connect } from 'react-redux'
import Record from './Record.jsx'


var activeSave

const styles = theme => ({
    root: {
        paddingRight: 2,
    },
    tolbar: {
        position: 'relative'
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
    typography: {
        margin: '1em 0 0 2em',
        fontSize: '2em'
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
        width: '70vw',
        marginTop: '3vh',
        padding: 0,
        height: '80vh'
    }
})


@connect((store) => {
    return {
        registro: store.registro.registro,
        tabla: store.tabla.tableRecords,
        saved: store.registros.saved
    }
})

class EditRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codigo: this.props.codigo,
        }
        this.saveRecord = this.saveRecord.bind(this)
        this.cancelFile = this.cancelFile.bind(this)
    }
    
    componentWillMount() {
        activeSave = false
    }

    saveRecord = () => {
        activeSave = true
        this.child.saveRecord()
    }
    
    cancelFile = () => {
        const { history } = this.props
        history.push('/registros')
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/registros')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.registro?this.props.tabla.nombre +'-'+ this.props.registro.codigo:'Nuevo registro para: '+this.props.tabla.nombre}</Typography>
                    <Tooltip title="Save">
                        <IconButton className={classes.tooltipSave} disabled={activeSave} aria-label="Save" onClick={event => this.saveRecord()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelFile()}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Record data={this.props.tabla} registro={this.props.registro} onRef={ref => (this.child = ref)}  />
            </form>
        )
    }
}

EditRecord.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditRecord))