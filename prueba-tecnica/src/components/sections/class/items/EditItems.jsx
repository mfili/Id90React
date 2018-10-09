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
import store from '../../../../store/store'
import { connect } from 'react-redux'
import { postClassItem } from '../../../../store/actions/class/items/itemsActions'
import { changeValue } from '../../../../store/actions/class/items/itemActions'
import { fetchConceptsList } from '../../../../store/actions/concepts/conceptsActions'
import { fetchPeriodList } from '../../../../store/actions/period/periodsActions'
import ComponentItems from './ComponentItems.jsx'
import ComponentAutocomplete from '../../ComponentAutocomplete.jsx'
import PeriodsChips from '../../period/PeriodsChips.jsx'

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
    var fechaCreacion = Date.now()

    var itemsPeriodos = []
    if (store.periodo.itemsPeriodos) {
        for (var i = 0; i < store.periodo.itemsPeriodos.length; i++) {
            if(store.periodo.itemsPeriodos[i]!=''){
                itemsPeriodos.push({
                    "idPeriodo": store.periodo.itemsPeriodos[i]
                })
            }
        }
        
        var clase = null
        if(store.item.idClase){
            clase= {
                "idClase": store.item.idClase
            }
        }
        
        var items = null
        if(store.item.idItem){
            items= {
                "idConcepto": store.item.idItem
            }
        }

        data = {
            "idClaseItem": store.item.idClaseItem,
            "clase": clase,
            "items": items,
            "numero": store.item.numero,
            "monto": store.item.monto,
            "fechaCreacion": store.item.fechaCreacion?store.item.fechaCreacion:fechaCreacion,
            "periodo": itemsPeriodos
        }
    }
    return {
        idClaseItem: store.item.idClaseItem,
        idClase: store.clase.idClase,
        descripcion: store.clase.descripcion,
        idItem: store.item.idItem,
        numero: store.item.numero,
        monto: store.item.monto,
        fechaCreacion: store.item.fechaCreacion?store.item.fechaCreacion:fechaCreacion,
        saved: store.items.saved
    }
})

class EditItems extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveItems = this.saveItems.bind(this)
        this.cancelItems = this.cancelItems.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id,new Date(date)))
    }

    saveItems = () => {
        store.dispatch(postClassItem(data))
    }
    
    cancelItems = () => {
        const { history } = this.props
        history.push('/items')
    }

    componentDidMount() {
        store.dispatch(fetchPeriodList())
        store.dispatch(fetchConceptsList(1))
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/items')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.idClase? this.props.idClase + '-' + this.props.descripcion:'[Id]-[Item]'}</Typography>
                    <Tooltip title="Save" >
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveItems()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" >
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelItems()}>
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
                                        id="numero"
                                        label="Número"
                                        value={this.props.numero}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <TextField className={classes.field}
                                        id="monto"
                                        label="Monto"
                                        value={this.props.monto}
                                        onChange={this.handleValueChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                    <DatePicker style={{
                                        width: '19vw',
                                        marginTop: '1em'}}
                                    keyboard
                                    label="Fecha de Creación"
                                    onError={console.log}
                                    value={this.props.fechaCreacion}
                                    onChange={this.handleDateChange.bind(this, 'fechaCreacion')}
                                    format="YYYY-MM-DD"
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <PeriodsChips component="item"/>
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <ComponentItems
                            labelDialog={this.props.labelDialog}
                            idComponent="idConceptos"
                            onRef={ref => (this.child = ref)}
                        />
                </div>
            </form>
        )
    }
}

EditItems.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditItems))