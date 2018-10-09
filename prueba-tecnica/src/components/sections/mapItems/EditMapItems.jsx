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
import { postMapItem } from '../../../store/actions/mapItem/mapItemsActions'
import { changeValue } from '../../../store/actions/mapItem/mapItemActions'
import { fetchConceptsList } from '../../../store/actions/concepts/conceptsActions'
import { fetchPeriodList } from '../../../store/actions/period/periodsActions'
import ComponentItems from './ComponentItems.jsx'
import ComponentAutocomplete from '../ComponentAutocomplete.jsx'
import PeriodsChips from '../period/PeriodsChips.jsx'

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
    
    var periodos = []

    var legajo = null
    if(store.legajo.idLegajo){
        legajo= {
            "idLegajo": store.legajo.idLegajo
        }
    }
    
    var items = null
    if(store.mapaItem.idItem){
        items= {
            "idConcepto":store.mapaItem.idItem
        }
    }

    data = {
        "idMapaItem": store.mapaItem.idMapaItem,
        "legajo": legajo,
        "items": items,
        "numero": store.mapaItem.numero,
        "monto": store.mapaItem.monto,
        "fechaCreacion": store.mapaItem.fechaCreacion,
        "periodo": periodos
    }

    if (store.periodo.itemsPeriodos) {
        for (var i = 0; i < store.periodo.itemsPeriodos.length; i++) {
            if(store.periodo.itemsPeriodos[i]!=''){
                periodos.push({
                    "idPeriodo": store.periodo.itemsPeriodos[i]
                })
            }
        }
    }
    return {
        idLegajo: store.legajo.idLegajo,
        legajo: store.legajo.legajo,
        nombre: store.legajo.nombre,
        apellido: store.legajo.apellido,
        idMapaItem: store.mapaItem.idMapaItem,
        idItem: store.mapaItem.idItem,
        numero: store.mapaItem.numero,
        monto: store.mapaItem.monto,
        fechaCreacion: store.mapaItem.fechaCreacion,
        periodo:store.periodos.periodos,
        saved: store.mapaItems.saved
    }
})

class EditMapItem extends Component {
    constructor(props) {
        super(props)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.saveMapItem = this.saveMapItem.bind(this)
        this.cancelMapItem = this.cancelMapItem.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    handleDateChange = (id, date) => {
        store.dispatch(changeValue(id, date.format("YYYY-MM-DD")))
    }

    saveMapItem = () => {
        store.dispatch(postMapItem(data))
    }
    
    cancelMapItem = () => {
        const { history } = this.props
        history.push('/mapaItems')
    }

    componentDidMount() {
        store.dispatch(fetchPeriodList())
        store.dispatch(fetchConceptsList(1))
    }
     
    setPeriod(id, value){
        store.dispatch(savePeriod(id, value))
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/mapaItems')
        }
        const { classes, theme } = this.props
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.legajo?this.props.legajo + '-' + this.props.nombre + ' ' + this.props.apellido:'[Período]-[Descripción]'}</Typography>
                    <Tooltip title="Save">
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveMapItem()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelMapItem()}>
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
                                <PeriodsChips component="mapaItem"/>
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <ComponentItems
                        titleDialog={this.props.titleDialog}
                        labelDialog={this.props.labelDialog}
                        dataList={this.props.conceptos}
                        idComponent="idConceptos"
                        onRef={ref => (this.child = ref)}
                    />
                </div>
            </form>
        )
    }
}

EditMapItem.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditMapItem))