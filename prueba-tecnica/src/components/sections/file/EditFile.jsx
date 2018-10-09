import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { InputLabel,Input } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import {Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import {List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import Build from '@material-ui/icons/Build'
import Group from '@material-ui/icons/Group'
import PersonOutline from '@material-ui/icons/PersonOutline'
import ListIcon from '@material-ui/icons/List'
import History from '@material-ui/icons/History'
import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
import Dashboard from '@material-ui/icons/Dashboard'
import Save from '@material-ui/icons/sdStorage'
import Cancel from '@material-ui/icons/Cancel'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchStatesList } from '../../../store/actions/files/stateActions'
import { fetchEmpresaList } from '../../../store/actions/files/empresaActions'
import { fetchPositionList } from '../../../store/actions/files/positionActions'
import { fetchCostCenterList } from '../../../store/actions/files/costCenterActions'
import { fetchUnityList } from '../../../store/actions/files/unityActions'
import { fetchDocumentTypeList } from '../../../store/actions/files/documentTypeActions'
import { fetchCivilStatusList } from '../../../store/actions/files/civilStatusActions'
import { fetchNationalityList } from '../../../store/actions/files/nationalityActions'
import { fetchEducationalLevelList } from '../../../store/actions/files/educationalLevelActions'
import { fetchDegreesList } from '../../../store/actions/files/degreesActions'
import { fetchProfessionList } from '../../../store/actions/files/professionActions'
import { fetchLanguageList } from '../../../store/actions/files/languageActions'
import { fetchEgressReasonList } from '../../../store/actions/files/egressReasonActions'
import { fetchClassList } from '../../../store/actions/class/classesActions'
import { fetchAgreementList } from '../../../store/actions/files/agreementActions'
import { fetchCategoryList } from '../../../store/actions/files/categoryActions'
import { fetchSocialWorkList } from '../../../store/actions/socialWork/socialWorksActions'
import { fetchPlanSocialWorkList } from '../../../store/actions/socialWork/socialWorkPlan/socialWorkPlansActions'
import { fetchTypeContractList } from '../../../store/actions/files/typeContractActions'
import { fetchPaymentRegimeList } from '../../../store/actions/files/paymentRegimeActions'
import { fetchTypeWorkingDayList } from '../../../store/actions/files/typeWorkingDayActions'
import { fetchLaborUnionList } from '../../../store/actions/files/laborUnionActions'
import { fetchWorkplaceList } from '../../../store/actions/files/workplaceActions'
import { fetchTypeAgreementList } from '../../../store/actions/files/typeAgreementActions'
import { fetchEmploymentSituationList } from '../../../store/actions/files/employmentSituationActions'
import { fetchModalityContractingList } from '../../../store/actions/files/modalityContractingActions'
import { fetchActivityCodeList } from '../../../store/actions/files/activityCodeActions'
import { fetchGeographicalAreaList } from '../../../store/actions/files/geographicalAreaActions'
import { fetchGeographicalAreaFMList } from '../../../store/actions/files/geographicalAreaFMActions'
import { fetchWayToPayList } from '../../../store/actions/files/wayToPayActions'
import { fetchBankList } from '../../../store/actions/files/bankActions'
import { fetchAdditionalClassification1List } from '../../../store/actions/files/additionalClassification1Actions'
import { fetchAdditionalClassification2List } from '../../../store/actions/files/additionalClassification2Actions'
import { changeValue } from '../../../store/actions/files/fileActions'
import { postFile } from '../../../store/actions/files/filesActions'
import GeneralData from './GeneralData.jsx'
import PersonalData from './PersonalData.jsx'
import CompanyData from './CompanyData.jsx'
import SocialSecurityData from './SocialSecurityData.jsx'
import PaymentMethodsData from './PaymentMethodsData.jsx'


var data= {}

const styles = theme => ({
    root: {
        paddingRight: 2,
    },
    drawerHeader: {
        backgroundColor: theme.palette.primary[500],
        height: '10vh',
        position: 'relative'
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
    select: {
        width: '21vw',
        marginTop: '1em'
    },
    field: {
        width: '21vw'
    }
})

@connect((store) => {
    var empresa = {}
    if(store.legajo.idEmpresa){
        empresa= {
            "idEmpresa": store.legajo.idEmpresa
        }
    }

    var estadoCivil = {}
    if(store.legajo.idEstadoCivil){
        estadoCivil= {
            "idEstadoCivil": store.legajo.idEstadoCivil
        }
    }
    
    var profesion = null
    if(store.legajo.idProfesion){
        profesion= {
            "idProfesion": store.legajo.idProfesion
        }
    }
    
    var clase = null
    if(store.legajo.idClase){
        clase= {
            "idClase": store.legajo.idClase
        }
    }
    
    var convenio = null
    if(store.legajo.codigoConvenio){
        convenio= {
            "codigoConvenio": store.legajo.codigoConvenio
        }
    }
    
    var categoria = null
    if(store.legajo.codigoCategoria){
        categoria= {
            "codigoCategoria": store.legajo.codigoCategoria
        }
    }
    
    var obraSocial = null
    if(store.legajo.codigoObraSocial){
        obraSocial= {
            "codigoObraSocial": store.legajo.codigoObraSocial
        }
    }
    
    var planObraSocial = null
    if(store.legajo.codigoPlanObraSocial){
        planObraSocial= {
            "codigoPlanObraSocial": store.legajo.codigoPlanObraSocial
        }
    }

    data = {
        "idLegajo": store.legajo.idLegajo,
        "legajo": store.legajo.legajo,
        "cuil": store.legajo.cuil,
        "nombre": store.legajo.nombre,
        "apellido": store.legajo.apellido,
        "estado": {
            "codigoEstado": store.legajo.codigoEstado
        },
        "empresa": empresa,
        "codigoCargo": store.legajo.codigoCargo,
        "idCentroCosto": store.legajo.idCentroCosto,
        "idUnidad": store.legajo.idUnidad,
        "idSeccion": store.legajo.idSeccion,
        "confidencial": store.legajo.confidencial,
        "numeroFicha": store.legajo.numeroFicha,
        "idTipoDocumento": store.legajo.idTipoDocumento,
        "numeroDocumento": store.legajo.numeroDocumento,
        "fechaNacimiento": store.legajo.fechaNacimiento,
        "estadoCivil": estadoCivil,
        "sexo": store.legajo.sexo,
        "direccion1": store.legajo.direccion1,
        "direccion2": store.legajo.direccion2,
        "direccion3": store.legajo.direccion3,
        "telefonoFijo": store.legajo.telefonoFijo,
        "celular": store.legajo.celular,
        "email": store.legajo.email,
        "idNacionalidad": store.legajo.idNacionalidad,
        "idNivelEstudios": store.legajo.idNivelEstudios,
        "idTitulo": store.legajo.idTitulo,
        "profesion": profesion,
        "idIdioma": store.legajo.idIdioma,
        "numeroRegistro": store.legajo.numeroRegistro,
        "fechaVencimientoRegistro": store.legajo.fechaVencimientoRegistro,
        "tallaRopa": store.legajo.tallaRopa,
        "tallaZapatos": store.legajo.tallaZapatos,
        "fechaAlta": store.legajo.fechaAlta,
        "fechaAntiguedad": store.legajo.fechaAntiguedad,
        "fechaBaja": store.legajo.fechaBaja,
        "idMotivoBaja": store.legajo.idMotivoBaja,
        "antiguedad": store.legajo.antiguedad,
        "idTipoContrato": store.legajo.idTipoContrato,
        "idRegimenPago": store.legajo.idRegimenPago,
        "idTipoJornada": store.legajo.idTipoJornada,
        "clase": clase,
        "convenio": convenio,
        "categoria": categoria,
        "idSindicato": store.legajo.idSindicato,
        "ocupacion": store.legajo.ocupacion,
        "telefonoInterno": store.legajo.telefonoInterno,
        "horasMensuales": store.legajo.horasMensuales,
        "idSistemaRRHH": store.legajo.idSistemaRRHH,
        "numeroCredencial": store.legajo.numeroCredencial,
        "tipoCentroCosto": store.legajo.tipoCentroCosto,
        "idLugarTrabajo": store.legajo.idLugarTrabajo,
        "idClasificacionAdicional1": store.legajo.idClasificacionAdicional1,
        "idClasificacionAdicional2": store.legajo.idClasificacionAdicional2,
        "fechaAdicional1": store.legajo.fechaAdicional1,
        "fechaAdicional2": store.legajo.fechaAdicional2,
        "textoAdicional1": store.legajo.textoAdicional1,
        "textoAdicional2": store.legajo.textoAdicional2,
        "montoAdicional1": store.legajo.montoAdicional1,
        "montoAdicional2": store.legajo.montoAdicional2,
        "idJefe": store.legajo.idJefe,
        "jubilado": store.legajo.jubilado,
        "obraSocial": obraSocial,
        "planObraSocial": planObraSocial,
        "afiliadoOS": store.legajo.afiliadoOS,
        "idTipoAcuerdo": store.legajo.idTipoAcuerdo,
        "topeOS": store.legajo.topeOS,
        "fechaIngresoOS": store.legajo.fechaIngresoOS,
        "fechaVencimientoOS": store.legajo.fechaVencimientoOS,
        "idSituacionLaboral": store.legajo.idSituacionLaboral,
        "idModalidadContratacion": store.legajo.idModalidadContratacion,
        "idCodigoActividad": store.legajo.idCodigoActividad,
        "idZonaGeografica": store.legajo.idZonaGeografica,
        "idZonaGeograficaFM": store.legajo.idZonaGeograficaFM,
        "idFormaPago1": store.legajo.idFormaPago1,
        "porcentajePago1": store.legajo.porcentajePago1,
        "cbuPago1": store.legajo.cbuPago1,
        "idBancoPago1": store.legajo.idBancoPago1,
        "nroCuentaPago1": store.legajo.nroCuentaPago1,
        "idFormaPago2": store.legajo.idFormaPago2,
        "porcentajePago2": store.legajo.porcentajePago2,
        "cbuPago2": store.legajo.cbuPago2,
        "idBancoPago2": store.legajo.idBancoPago2,
        "nroCuentaPago2": store.legajo.nroCuentaPago2,
        "idBeneficiario": store.legajo.idBeneficiario,
        "fechaInicialVacaciones": store.legajo.fechaInicialVacaciones,
        "idFormulaVacaciones": store.legajo.idFormulaVacaciones,
        "diasBaseVacaciones": store.legajo.diasBaseVacaciones,
        "diasAjusteVacaciones": store.legajo.diasAjusteVacaciones
    }
    return {
        legajo: store.legajo.legajo,
        apellido: store.legajo.apellido,
        nombre: store.legajo.nombre,
        cuil: store.legajo.cuil,
        estado: store.legajo.descripcionEstado,
        codigoObraSocial: store.legajo.codigoObraSocial,
        saved: store.legajos.saved
    }
})

class EditFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerTools: false,
            tab: 0,
            cuil: this.formatCuil(this.props.cuil)
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.tabChange = this.tabChange.bind(this)
        this.saveFile = this.saveFile.bind(this)
        this.cancelFile = this.cancelFile.bind(this)
        this.handleToolsRequestChange = this.handleToolsRequestChange.bind(this)
    }

    componentDidMount() {
        store.dispatch(fetchStatesList())
        store.dispatch(fetchEmpresaList())
        store.dispatch(fetchPositionList(2002))
        store.dispatch(fetchCostCenterList(2003))
        store.dispatch(fetchUnityList(2004))
        store.dispatch(fetchDocumentTypeList(2005))
        store.dispatch(fetchCivilStatusList())
        store.dispatch(fetchNationalityList(2012))
        store.dispatch(fetchEducationalLevelList(2013))
        store.dispatch(fetchDegreesList(2014))
        store.dispatch(fetchProfessionList())
        store.dispatch(fetchLanguageList(2015))
        store.dispatch(fetchEgressReasonList(2016))
        store.dispatch(fetchClassList())
        store.dispatch(fetchAgreementList())
        store.dispatch(fetchCategoryList())
        store.dispatch(fetchSocialWorkList())
        store.dispatch(fetchPlanSocialWorkList(this.props.codigoObraSocial))
        store.dispatch(fetchTypeContractList(2017))
        store.dispatch(fetchPaymentRegimeList(2018))
        store.dispatch(fetchTypeWorkingDayList(2020))
        store.dispatch(fetchLaborUnionList(2021))
        store.dispatch(fetchWorkplaceList(2022))
        store.dispatch(fetchTypeAgreementList(2023))
        store.dispatch(fetchEmploymentSituationList(2024))
        store.dispatch(fetchModalityContractingList(2025))
        store.dispatch(fetchActivityCodeList(2026))
        store.dispatch(fetchGeographicalAreaList(2027))
        store.dispatch(fetchGeographicalAreaFMList(2028))
        store.dispatch(fetchWayToPayList(2029))
        store.dispatch(fetchBankList(2030))
        store.dispatch(fetchAdditionalClassification1List(2031))
        store.dispatch(fetchAdditionalClassification2List(2032))
    }
    
    handleValueChange = event => {
        store.dispatch(changeValue(event.target.id?event.target.id:event.target.name,event.target.value))
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

    openTools = () => {
        this.setState({
            drawerTools: true
        })
    }
    
    handleToolsRequestChange(e) {
        this.setState({
            drawerTools: !this.state.drawerTools
        })
    }

    saveFile = () => {
        store.dispatch(postFile(data))
    }
    
    cancelFile = () => {
        const { history } = this.props
        history.push('/legajos')
    }

    tabChange = (event, tab) => {
        this.setState({ tab });
    }

    render() {
        if(this.props.saved == true){
            const { history } = this.props
            history.push('/legajos')
        }
        const { classes, theme } = this.props
        const { tab } = this.state;
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Toolbar className={classes.tolbar}>
                    <Typography type="title">{"Legajo " + this.props.legajo + " " + this.props.apellido + " " + this.props.nombre + " " + this.state.cuil + " " + this.props.estado}</Typography>
                    <Tooltip title="Tools" >
                        <IconButton className={classes.tooltipTools} aria-label="Tools" onClick={event => this.openTools()}>
                            <Build />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Save" >
                        <IconButton className={classes.tooltipSave} aria-label="Save" onClick={event => this.saveFile()}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" >
                        <IconButton className={classes.tooltipCancel} aria-label="Cancel" onClick={event => this.cancelFile()}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Drawer style={{ width: '55%'}} anchor="right" open={this.state.drawerTools} onRequestClose={this.handleToolsRequestChange} onClose={this.handleToolsRequestChange}>
                    <div className={classes.drawerHeader}>
                        <Typography style={{ color: 'white', padding: 'none', marginLeft: '10px', position: 'absolute', bottom: '1em', fontWeight: 'bold' }}>
                                Herramientas del Empleado
                        </Typography>
                    </div>
                    <Divider />
                    <List className={classes.list}>
                        <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText primary="Familiares del empleado" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/ausentismo" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonOutline />
                                </ListItemIcon>
                                <ListItemText primary="Ausentismo" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary="Datos adicionales" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/mapaItems" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Mapa de ítems" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <History />
                                </ListItemIcon>
                                <ListItemText primary="Históricos" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/vacaciones" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <FlightTakeoff />
                                </ListItemIcon>
                                <ListItemText primary="Vacaciones" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary="Acumuladores de ganancias" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary="Asignaciones" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleToolsRequestChange}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary="Hoja de vida" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <AppBar className={classes.appBar} position="static">
                    <Tabs value={tab} onChange={this.tabChange}>
                        <Tab label="Datos Generales" />
                        <Tab label="Datos Personales" />
                        <Tab label="De la empresa"/>
                        <Tab label="Datos Previsionales"/>
                        <Tab label="F. Pago"/>
                    </Tabs>
                </AppBar>
                {tab === 0 && <GeneralData />}
                {tab === 1 && <PersonalData />}
                {tab === 2 && <CompanyData />}
                {tab === 3 && <SocialSecurityData />}
                {tab === 4 && <PaymentMethodsData />}
            </form>
        )
    }
}

EditFile.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object
}

export default  withRouter(withStyles(styles)(EditFile))