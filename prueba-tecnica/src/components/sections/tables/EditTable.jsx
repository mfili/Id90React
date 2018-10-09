import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { postTable } from '../../../store/actions/tables/tablesActions'
import { changeValue } from '../../../store/actions/tables/tableActions'


var data= {}
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
    title: {
        flex: '0 0 auto',
    },
    divGlobal: {
        position: 'relative',
    },
    grid: {
    },
    formControl: {
        margin: '1em 0em 1em 2em'
    },
    form: {
        width: '70vw',
        marginTop: '3vh',
        padding: 0,
        height: '80vh'
    }
})


@connect((store) => {
    data = {
        'idTabla': store.tabla.idTabla,
        'codigo': store.tabla.codigo,
        'nombre': store.tabla.nombre,
        'textoALabel': store.tabla.textoALabel,
        'textoBLabel': store.tabla.textoBLabel,
        'textoCLabel': store.tabla.textoCLabel,
        'textoDLabel': store.tabla.textoDLabel,
        'numeroALabel': store.tabla.numeroALabel,
        'numeroBLabel': store.tabla.numeroBLabel,
        'numeroCLabel': store.tabla.numeroCLabel,
        'numeroDLabel': store.tabla.numeroDLabel,
        'booleanoALabel': store.tabla.booleanoALabel,
        'booleanoBLabel': store.tabla.booleanoBLabel,
        'booleanoCLabel': store.tabla.booleanoCLabel,
        'booleanoDLabel': store.tabla.booleanoDLabel,
        'fechaHoraALabel': store.tabla.fechaHoraALabel,
        'fechaHoraBLabel': store.tabla.fechaHoraBLabel,
        'companyId':store.login.companyId
    }
    return {
        codigo: store.tabla.codigo,
        nombre: store.tabla.nombre,
        textoALabel: store.tabla.textoALabel,
        textoBLabel: store.tabla.textoBLabel,
        textoCLabel: store.tabla.textoCLabel,
        textoDLabel: store.tabla.textoDLabel,
        numeroALabel: store.tabla.numeroALabel,
        numeroBLabel: store.tabla.numeroBLabel,
        numeroCLabel: store.tabla.numeroCLabel,
        numeroDLabel: store.tabla.numeroDLabel,
        booleanoALabel: store.tabla.booleanoALabel,
        booleanoBLabel: store.tabla.booleanoBLabel,
        booleanoCLabel: store.tabla.booleanoCLabel,
        booleanoDLabel: store.tabla.booleanoDLabel,
        fechaHoraALabel: store.tabla.fechaHoraALabel,
        fechaHoraBLabel: store.tabla.fechaHoraBLabel,
        saved: store.tablas.saved
    }
})

class EditTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codigo: this.props.codigo,
            nombre: this.props.nombre
        }
        this.saveTable = this.saveTable.bind(this)
        this.cancelFile = this.cancelFile.bind(this)
    }

    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
    }

    componentWillMount() {
        activeSave = false
    }
    
    saveTable = () => {
        activeSave = true
        store.dispatch(postTable(data))
    }
    
    cancelFile = () => {
        const { history } = this.props
        history.push('/tablas')
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/tablas')
        }
        const { classes, theme } = this.props
        const { tab } = this.state;
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.props.codigo!=''?this.props.codigo + '-':'[codigo]-'}{this.props.nombre!=''?this.props.nombre:'[nombre]'}</Typography>
                    <Tooltip title="Save">
                        <IconButton className={classes.tooltipSave} disabled={activeSave} aria-label="Save" onClick={event => this.saveTable()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelFile()}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <FormGroup >
                    <Grid container spacing={0}>
                        <Grid className={classes.grid}item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="codigo"
                                    label="Código de Tabla"
                                    value={this.props.codigo}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="nombre"
                                    label="Nombre"
                                    value={this.props.nombre}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="textoALabel"
                                    label="Texto A Label"
                                    value={this.props.textoALabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="textoBLabel"
                                    label="Texto B Label"
                                    value={this.props.textoBLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="textoCLabel"
                                    label="Texto C Label"
                                    value={this.props.textoCLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="textoDLabel"
                                    label="Texto D Label"
                                    value={this.props.textoDLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroALabel"
                                    label="Numero A Label"
                                    value={this.props.numeroALabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroBLabel"
                                    label="Numero B Label"
                                    value={this.props.numeroBLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroCLabel"
                                    label="Numero C Label"
                                    value={this.props.numeroCLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="numeroDLabel"
                                    label="Numero D Label"
                                    value={this.props.numeroDLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="booleanoALabel"
                                    label="Booleano A Label"
                                    value={this.props.booleanoALabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="booleanoBLabel"
                                    label="Booleano B Label"
                                    value={this.props.booleanoBLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="booleanoCLabel"
                                    label="Booleano C Label"
                                    value={this.props.booleanoCLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="booleanoDLabel"
                                    label="Booleano D Label"
                                    value={this.props.booleanoDLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="fechaHoraALabel"
                                    label="Fecha Hora A Label"
                                    value={this.props.fechaHoraALabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField className={classes.field}
                                    id="fechaHoraBLabel"
                                    label="Fecha Hora B Label"
                                    value={this.props.fechaHoraBLabel}
                                    onChange={this.handleValueChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                        </Grid>
                        <Grid className={classes.grid} item xs={3}>
                        </Grid>
                    </Grid>
                </FormGroup>
            </form>
        )
    }
}

EditTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditTable))