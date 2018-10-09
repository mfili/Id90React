import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import  { Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { postConcept } from '../../../store/actions/concepts/conceptsActions'
import { fetchConceptTypesList } from '../../../store/actions/concepts/conceptTypesActions'
import { fetchProfitsClassificationsList } from '../../../store/actions/concepts/profitsClassificationsActions'
import { fetchConceptualClassificationsList } from '../../../store/actions/concepts/conceptualClassificationsActions'
import { fetchFormulasList } from '../../../store/actions/formulas/formulasActions'
import { fetchAccumulatorsList } from '../../../store/actions/concepts/accumulatorsActions'
import BasicConfiguration from './BasicConfiguration.jsx'
import Options from './Options.jsx'


var data= {}

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
    var accumulators = []
    if (store.accumulators.conceptsAccumulators) {
        for (var i = 0; i < store.accumulators.conceptsAccumulators.length; i++) {
            if(store.accumulators.conceptsAccumulators[i]!=''){
                accumulators.push({
                    "idAcumulador": store.accumulators.conceptsAccumulators[i]
                })
            }
        }
    }
    data = {
        "idConcepto": store.concept.conceptId,
        "codigoConcepto": store.concept.codigo,
        "descripcionConcepto": store.concept.descripcion,
        "tipoConcepto": {
            "idTipoConcepto": store.concept.tipo
        },
        "codigoFormula": store.concept.formulaCode===''?null:store.concept.formulaCode,
        "numeroOrden": store.concept.orden,
        "clasificacionGanancias": {
            "idClasificacionGanancias": store.concept.profitsClassification
        },
        "clasificacionConceptual": {
            "idClasificacionConceptual": store.concept.conceptualClassification
        },
        "porcentajeExencion": store.concept.porcex,
        'acumulador':accumulators,
        "imprime": store.concept.imprimeRec,
        'interno':store.concept.inform,
        'remvar':store.concept.remvar,
        'imponible1':store.concept.rempimp1,
        'imponible2':store.concept.rempimp2,
        'imponible3':store.concept.rempimp3,
        'imponible4':store.concept.rempimp4,
        'imponible5':store.concept.rempimp5,
        'imponible6':store.concept.rempimp6,
        'imponible7':store.concept.rempimp7,
        'imponible8':store.concept.rempimp8,
        'imponible9':store.concept.rempimp9,
        'baseSac':store.concept.baseSac,
        'baseVac':store.concept.baseVac,
        'baseLic':store.concept.baseLic,
        'baseAcc':store.concept.baseAcc,
        'baseHHEE':store.concept.baseHHEE,
        'companyId':store.concept.companyId
    }
    return {
        codeConcept: store.concept.codigo,
        descripcion: store.concept.descripcion,
        tipos: store.conceptTypes.conceptTypes,
        tipo: store.concept.tipo,
        formulaCode: store.concept.formulaCode,
        formulaLabel: store.formulas.formulaLabel?store.formulas.formulaLabel:store.concept.formulaLabel,
        orden: store.concept.orden,
        profitsClassifications: store.profitsClassifications.profitsClassifications,
        profitsClassification: store.concept.profitsClassification,
        conceptualClassifications: store.conceptualClassifications.conceptualClassifications,
        conceptualClassification: store.concept.conceptualClassification,
        porcex: store.concept.porcex,
        saved: store.concepts.saved
    }
})

class EditConcept extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 0,
            codigoConcepto: this.props.codeConcept,
            descripcionConcepto: this.props.descripcion,
            basicConfiguration: {},
            optionsConfiguration: {}
        }
        this.tabChange = this.tabChange.bind(this)
        this.saveConcept = this.saveConcept.bind(this)
        this.cancelConcept = this.cancelConcept.bind(this)
    }

    componentDidMount() {
        store.dispatch(fetchConceptTypesList())
        store.dispatch(fetchProfitsClassificationsList())
        store.dispatch(fetchConceptualClassificationsList())
        store.dispatch(fetchFormulasList())
        store.dispatch(fetchAccumulatorsList())
    }

    saveConcept = () => {
        store.dispatch(postConcept(data))
    }
    
    cancelConcept = () => {
        const { history } = this.props
        history.push('/conceptos')
    }
    
    tabChange = (event, tab) => {
        this.setState({ tab });
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/conceptos')
        }
        const { classes, theme } = this.props
        const { tab } = this.state;
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{this.state.codigoConcepto + '-' + this.state.descripcionConcepto}</Typography>
                    <Tooltip title="Save" >
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveConcept()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" >
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelConcept()}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <AppBar className={classes.appBar} position="static">
                    <Tabs value={tab} onChange={this.tabChange}>
                        <Tab label="Configuración Básica" />
                        <Tab label="Opciones"/>
                    </Tabs>
                </AppBar>
                {tab === 0 && <BasicConfiguration />}
                {tab === 1 && <Options />}
            </form>
        )
    }
}

EditConcept.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditConcept))