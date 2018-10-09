import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import { Card, CardActions, CardContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {Menu,MenuItem} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Select from '@material-ui/core/Select'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import  { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Dashboard from '@material-ui/icons/Dashboard'
import Settings from '@material-ui/icons/Settings'
import Bank from '@material-ui/icons/accountbalance'
import Payment from '@material-ui/icons/Payment'
import Lock from '@material-ui/icons/Lock'
import Person from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import user from '../../images/juanchi.png'
import store from '../../store/store'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/loginActions'
import { withRouter } from 'react-router'

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * -1,
        marginLeft: theme.spacing.unit * -1,
        width: '100vw'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: '-12',
        marginRight: '20' 
    },
    drawer: {
        width: '55%'
    },
    list: {
        width: '25vw'
    },
    drawerHeader: {
        backgroundColor: theme.palette.primary[500],
        height: '10vh',
        position: 'relative'
    },
    card: {
        width: '30vw',
        height: '50vh',
        marginLeft: '70vw',
        position: 'absolute',
        zIndex: '1'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        inline: 0
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    }

})

@connect((store) => {
    return {
      company: store.login.companyId
    }
})

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerLOpen: false,
            anchorEl: null,
            openCompany: false,
            cardOpen: 'none',
            company: this.props.company,
            openMonthlyNews: false,
            openSecurity: false,
            anchorEl: null
        }

        // bind event handlers
        this.handleLeftRequestChange = this.handleLeftRequestChange.bind(this)
        this.handleLeftIconButtonTouchTap = this.handleLeftIconButtonTouchTap.bind(this)
        this.handleMonthlyNewsClick = this.handleMonthlyNewsClick.bind(this)
        this.handleReportsOutputsClick = this.handleReportsOutputsClick.bind(this)
        this.handleConfigurationClick = this.handleConfigurationClick.bind(this)
        this.handleSecurityClick = this.handleSecurityClick.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleButtonClose = this.handleButtonClose.bind(this)
        this.handleCompanyChange = this.handleCompanyChange.bind(this)
        this.logout = this.logout.bind(this)
    }


    handleLeftRequestChange(e) {
        this.setState({
            drawerLOpen: !this.state.drawerLOpen
        })
    }

    handleLeftIconButtonTouchTap(e) {
        this.setState({
            drawerLOpen: true
        })
    }
    
    handleMonthlyNewsClick = () => {
        this.setState({ openMonthlyNews: !this.state.openMonthlyNews })
    }
    
    handleReportsOutputsClick = () => {
        this.setState({ openReportsOutputs: !this.state.openReportsOutputs })
    }
    
    handleConfigurationClick = () => {
        this.setState({ openConfiguration: !this.state.openConfiguration })
    }

    handleSecurityClick = () => {
        this.setState({ openSecurity: !this.state.openSecurity })
    }

    handleButtonClick(e) {
        this.setState({ anchorEl: event.currentTarget })
    }
    
    handleButtonClose = () => {
        this.setState({ anchorEl: null });
    }

    handleCompanyChange = event => {
        this.setState({ company: event.target.value })
    }

    logout(e) {
        store.dispatch(logout())
    }


    render() {
        const { classes } = this.props
        const { anchorEl } = this.state;
        return (
            <Grid className={classes.root} >
                <AppBar position="static" className={classes.toolBarStyle} >
                    <Toolbar>
                        <IconButton color="inherit" className={classes.menuButton} aria-label="Menu" onClick={this.handleLeftIconButtonTouchTap}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            ID90
                        </Typography>
                            <Button color="inherit" className={classes.menuButton}
                                raised 
                                onClick = {this.logout} >
                                    Logout
                            </Button>
                    </Toolbar>
                </AppBar>
                <Menu style={{ marginLeft:'70vw' }} className={classes.card}
                    id="fade-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleButtonClose}
                    >
                    <Grid container spacing={24} >
                        <Grid item xs={4} >
                            <Avatar 
                                alt="Usuario"
                                src={user}
                                style={{ width: '55px', height: '57px', marginLeft: '10px' }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                                <Typography type="headline" component="h2">
                                    John Doe
                                </Typography>
                                <Typography component="p">
                                    contact@example.com
                                </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button style={{ fontSize: '0.9em', width: '100%' }} 
                                onClick={this.onFocus} raised color="primary"  >
                                Mi cuenta
                                </Button>
                        </Grid>
                    </Grid>
                    <Divider light />
                    <Select style={{ marginBottom: '1em', width: '100%' }}
                        value={this.state.company}
                        onChange={this.handleCompanyChange}
                        displayEmpty
                        name="company"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>Empresa</em>
                        </MenuItem>
                        <MenuItem value={1}>ITLatinGroup</MenuItem>
                        <MenuItem value={2}>XPay</MenuItem>
                    </Select>
                    <Divider light />
                    <Button style={{ width: '15vw', fontSize: '1.2em' , margin: '2.5em 0px 1em 5em' }} 
                    className={classes.button} 
                    raised 
                    color="primary"
                    onClick = {this.logout} >
                        Logout
                    </Button>
                </Menu>
                <Drawer style={{ width: '55%'}} open={this.state.drawerLOpen} onClose={this.handleLeftRequestChange}>
                    
                        <div className={classes.drawerHeader}>
                            <Typography style={{ color: 'white', padding: 'none', marginLeft: '10px', position: 'absolute', bottom: '1em', fontWeight: 'bold' }}>
                                    John Doe
                            </Typography>
                            <Typography style={{ color: 'white', padding: 'none', marginLeft: '10px', position: 'absolute', bottom: '2.5em' }}>
                                contact@example.com
                            </Typography>
                        </div>
                        <Divider />
                        <List className={classes.list}>
                        <ListItem button onClick={this.handleMonthlyNewsClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Novedades mensuales" />
                            {this.state.openMonthlyNews ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse component="li" in={this.state.openMonthlyNews} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Altas" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Bajas" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Conceptos" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Vacaciones" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Licencias, permisos e inasistencias" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="F 572" />
                                        </ListItem>
                                    </Link>
                                </List>
                            </Collapse>
                            <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Bank />
                                    </ListItemIcon>
                                    <ListItemText primary="Proceso" />
                                </ListItem>
                            </Link>
                            <ListItem button onClick={this.handleReportsOutputsClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Informes y salidas" />
                            {this.state.openReportsOutputs ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse component="li" in={this.state.openReportsOutputs} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Recibos" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Libro ley" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Interfaz SICOSS" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Interfaz SICORE" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Resumen del mes" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Detalles ganancias" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Interfaces a bancos" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Asiento contable" />
                                        </ListItem>
                                    </Link>
                                </List>
                            </Collapse>
                            <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Bank />
                                    </ListItemIcon>
                                    <ListItemText primary="Centro de descargas" />
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/legajos" onClick={this.handleLeftRequestChange}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Bank />
                                    </ListItemIcon>
                                    <ListItemText primary="Legajos" />
                                </ListItem>
                            </Link>
                            <ListItem button onClick={this.handleConfigurationClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Configuración" />
                            {this.state.openConfiguration ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse component="li" in={this.state.openConfiguration} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    <Link style={{ textDecoration: 'none' }} to="/empresa" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Empresas" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/conceptos" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Conceptos" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/formulas" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Fórmulas" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/clase" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Clases" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/periodo" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Periodos" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/tablas" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Tablas generales" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Convenios y categorías" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Escalas y deducciones de ganancias" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/obraSocial" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Obras sociales y planes" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Bancos" />
                                        </ListItem>
                                    </Link>
                                </List>
                            </Collapse>
                            <ListItem button onClick={this.handleSecurityClick}>
                            <ListItemIcon>
                                <Lock />
                            </ListItemIcon>
                            <ListItemText inset primary="Seguridad" />
                            {this.state.openSecurity ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse component="li" in={this.state.openSecurity} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Usuarios" />
                                        </ListItem>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Perfiles" />
                                        </ListItem>
                                    </Link>
                                </List>
                            </Collapse>
                            <Link style={{ textDecoration: 'none' }} to="/xpayPage" onClick={this.handleLeftRequestChange}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>
                                    <ListItemText primary="Clientes" />
                                </ListItem>
                            </Link>
                        </List>
                </Drawer>
            </Grid>
        )
    }
}

NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withRouter(withTheme()(withStyles(styles)(NavigationBar)))