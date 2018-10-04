import React from 'react'
import Button from '@material-ui/core/Button'
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input'
import { CircularProgress } from '@material-ui/core'
import { FormControl, FormHelperText } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import Menu, { MenuItem } from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import store from './store/store'
import { connect } from 'react-redux'
import { login, clearLogin, login2 } from './store/actions/loginActions'
import { fetchCompanyData } from './store/actions/companyActions'
import './login.css'



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

/*@connect((store) => {
    return {
        autenticationMessage: store.login.autenticationMessage,
        passwordAutentication: store.login.passwordAutentication,
        userAutentication: store.login.userAutentication,
        logging: store.login.logging,
        data: store.company.data
    }
})*/

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
            company: '',
            companyId: null,
            companyValidate: null,
            companyMessage: '',
        }
        this.redirectToDashboard = this.redirectToDashboard.bind(this)
        this.setUser = this.setUser.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.handleCompanyChange = this.handleCompanyChange.bind(this)
        this.setCompany = this.setCompany.bind(this)
        this.pressEnter = this.pressEnter.bind(this)
    }

    setUser(e) {
        this.setState({ user: e.target.value })
    }

    setPassword(e) {
        this.setState({ password: e.target.value })
    }

    setCompany(e) {
        this.setState(
            {
                companyId: e.target.value
            }
        )
    }

    handleCompanyChange = event => {
        this.setState({ company: event.target.value });
    }

    componentDidMount() {
        this.props.dispatch(fetchCompanyData())
    }

    createMenuItem() {
        var items = [];
        if (this.props.data) {
            for (var i = 0; i < this.props.data.length; i++) {
                items.push(
                    <MenuItem key={this.props.data[i].companyId} value={this.props.data[i].companyId}>{this.props.data[i].name}</MenuItem>
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
        var company = true

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

        if (this.state.company === null) {
            this.setState({ companyValidate: true, companyMessage: 'Campo Requerido' })
            company = true
        } else {
            this.setState({ companyValidate: false, companyMessage: '' })
            company = false
        }

        if (user == false && password == false && company == false) {
            store.dispatch(login2())
        }

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
                            <InputLabel htmlFor="user" multiline >Usuario</InputLabel>
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
                            <FormHelperText >{this.state.companyMessage}</FormHelperText>
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