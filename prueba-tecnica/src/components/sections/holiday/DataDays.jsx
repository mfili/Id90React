import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import  {Input, InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core/Menu'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import  { Tabs,Tab } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip'
import  { List,ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import store from '../../../store/store'
import { connect } from 'react-redux'
import HolidayList from './HolidayList.jsx'
import Totals from './Totals.jsx'
import OtherData from './OtherData.jsx'


var data= {}

const styles = theme => ({
    root: {
        paddingRight: 2,
    },
    appBar: {
        width:'43vw',
        background: '#FAFAFA',
        color: '#000000'
    },
    form: {
        padding: 0,
        margin: '0',
        height: '80vh',
        width: '90vw',
        overflow:'auto'
    },
})

class DataDays extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 0
        }
        this.tabChange = this.tabChange.bind(this)
    }

    tabChange = (event, tab) => {
        this.setState({ tab });
    }

    render() {
        const { classes, theme } = this.props
        const { tab } = this.state;
        return (
            <form className={classes.form} noValidate autoComplete="off">
                <Grid container spacing={0}>
                    <Grid item xs={5} >
                        <AppBar className={classes.appBar} position="static">
                            <Tabs value={tab} onChange={this.tabChange}>
                                <Tab label="Totales" />
                                <Tab style={{display:this.props.mostrarTabsDias}} label="Otros Datos" />
                            </Tabs>
                        </AppBar>
                        {tab === 0 && <Totals camposDevengados={this.props.camposDevengados} />}
                        {tab === 1 && <OtherData />}
                    </Grid>
                    <Grid item xs={7} >
                        <HolidayList />
                    </Grid>
                </Grid>
            </form>
        )
    }
}

DataDays.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object,
    mostrarTabsDias:PropTypes.string,
    camposDevengados:PropTypes.string
}

export default  withRouter(withStyles(styles)(DataDays))