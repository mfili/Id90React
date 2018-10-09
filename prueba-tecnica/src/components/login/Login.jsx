import React from 'react'
import Button from '@material-ui/core/Button'
import {Input,  InputLabel, InputAdornment } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core/CircularProgress'
import { FormControl, FormHelperText } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import {Menu, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import store from '../../store/store'
import { connect } from 'react-redux'
import { login, clearLogin } from '../../store/actions/loginActions'
import { fetchAirlinesList } from '../../store/actions/airlineActions'
import '../../style/login.css'



const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    FormHelperText: {
        color: 'red'
    }
})

@connect((store) => {
    return {
        /*autenticationMessage: store.login.autenticationMessage,
        passwordAutentication: store.login.passwordAutentication,
        userAutentication: store.login.userAutentication,
        logging: store.login.logging,*/
        airlines: store.airline.airline
    }
})

class Login extends React.Component {
    constructor() {
        super()
        store.dispatch(clearLogin())
        this.state = {
            user: '',
            userValidate: null,
            userMessage: '',
            password: '',
            passwordValidate: null,
            passwordMessage: '',
            airline: '',
            airlineId: 0,
            airlineValidate: null,
            airlineMessage: '',
        }
        this.redirectToDashboard = this.redirectToDashboard.bind(this)
        this.setUser = this.setUser.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.handleAirlineChange = this.handleAirlineChange.bind(this)
        this.setAirline = this.setAirline.bind(this)
        this.pressEnter = this.pressEnter.bind(this)
        this.createMenuItem = this.createMenuItem.bind(this)
    }

    setUser(e) {
        this.setState({ user: e.target.value })
    }

    setPassword(e) {
        this.setState({ password: e.target.value })
    }

    setAirline(e) {
        this.setState(
            {
                airlineId: e.target.value
            }
        )
    }

    handleAirlineChange = event => {
        this.setState({ airline: event.target.value });
    }

    createMenuItem() {
        var items = [];
        if (this.props.airlines.length>0) {
            for (var i = 0; i < 10; i++) {
                items.push(
                    <MenuItem key={this.props.airlines[i].id} value={this.props.airlines[i].id}>{this.props.airlines[i].name}</MenuItem>
                )
            }
        }
        return items;

    }

    pressEnter(e) {
        if (e.key === 'Enter') {
            this.redirectToDashboard()
        }
    }

    redirectToDashboard(e) {
        var user = true
        var password = true
        var airline = true

        if (this.state.user === '') {
            this.setState({ userValidate: true, userMessage: 'Campo Requerido' })
            user = true
        } else {
            this.setState({ userValidate: false, userMessage: '' })
            user = false
        }

        if (this.state.password === '') {
            this.setState({ passwordValidate: true, passwordMessage: 'Campo Requerido' })
            password = true
        } else {
            this.setState({ passwordValidate: false, passwordMessage: '' })
            password = false
        }

        if (this.state.airlineId === null) {
            this.setState({ airlineValidate: true, airlineMessage: 'Campo Requerido' })
            airline = true
        } else {
            this.setState({ airlineValidate: false, airlineMessage: '' })
            airline = false
        }

        if (user == false && password == false && airline == false) {
            store.dispatch(login(this.state.user,this.state.password,this.state.airlineId))
        }

    }

    componentDidMount() {
        this.props.dispatch(fetchAirlinesList())
    }

    render() {
        const classes = this.props.classes
        var button = {}
        var progress = {}
        button = <Button className="login-button" onClick={this.redirectToDashboard} raised color="primary"  >
            Ingresar
                    </Button>
        progress = <div center><CircularProgress style={{ width: '2vw', height: '2vh', marginLeft: '14vw' }} className={classes.progress} /></div>
        return (
            <div className="login-container">
                <div style={{ textAlign: 'center' }} className="login-form">
                    <form className={classes.container} autoComplete="off">
                        <FormControl fullWidth >
                            <InputLabel htmlFor="user" >Usuario</InputLabel>
                            <Input
                                error={this.props.userAutentication ? this.props.userAutentication : this.state.userValidate}
                                id="user"
                                value={this.state.user}
                                onChange={this.setUser}
                            />
                            <FormHelperText >{this.state.userMessage}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="password" >Password</InputLabel>
                            <Input
                                error={this.props.passwordAutentication ? this.props.passwordAutentication : this.state.passwordValidate}
                                id="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.setPassword}
                                onKeyPress={this.pressEnter}
                            />
                            <FormHelperText >{this.state.passwordMessage}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                        <Select style={{ marginBottom: '1em', width: '100%' }}
                            value={this.state.airlineId}
                            onChange={this.setAirline}
                            displayEmptyairlinairlineId
                            name="airline"
                            className={classes.selectEmpty}
                        >
                            <MenuItem key={0} value={0}>Airline</MenuItem>
                            {this.createMenuItem()}
                        </Select>
                            <FormHelperText >{this.state.airlineMessage}</FormHelperText>
                            <FormHelperText className={classes.FormHelperText}>{this.props.autenticationMessage}</FormHelperText>
                        </FormControl>
                        {
                            (this.props.logging === false || this.props.logging === undefined) &&
                            button
                        }
                        {
                            (this.props.logging === true) &&
                            progress
                        }
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(withStyles(styles)(Login))