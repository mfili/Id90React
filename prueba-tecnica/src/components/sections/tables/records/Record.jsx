import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles'
import { FormGroup, FormControl, FormControlLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import store from '../../../../store/store'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { changeValue } from '../../../../store/actions/tables/records/recordActions'
import { postRecord } from '../../../../store/actions/tables/records/recordsActions'
import  moment from 'moment'

import DateTimePicker from 'material-ui-pickers/DateTimePicker'
var data = {}

var myComponents

const styles = theme => ({
    root: {
        height: '88%',
        overflow: 'auto'
    },
    grid: {
        position: 'relative',
        marginLeft: '8vw',
        width: '80vw'
    },
    field: {
        width: '21vw'
    }
})


class Record extends Component {
    // Added as a component property
    constructor(props) {
        super(props)
        // Set the default state immediately
        this.state = {
            idTabla: this.props.data['idTabla'],
            idRegistro: this.props.registro ? this.props.registro.idRegistro : 0

        }


    }
    handleDateChange = (id,date) => {
        this.setState({ [id]: date.format("YYYY-MM-DD HH:mm:ss") });
      }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillMount() {
        for (var key in this.props.registro) {
            if (moment(this.props.registro[key],'YYYY-MM-DD HH:mm:ss',true).isValid()) {
                var datetime = moment.utc(this.props.registro[key]).format("YYYY-MM-DD hh:mm:ss")
                this.setState({
                    [key]: datetime
                })
            } else {
                this.setState({
                    [key]: this.props.registro[key]
                })
            }
        }
        this.props.onRef(undefined)
    }

    getComponents = () => {

        const { classes, theme } = this.props
        var json_parsed = this.props.data
        var registro = this.props.registro
        data.idTabla = this.props.data['idTabla']
        var components = []

        var newComponent
        newComponent = <Grid className={classes.grid} item xs={4}>
            <TextField
                style={{ width: '21vw', marginBottom: '3em' }}
                id="codigo"
                value={this.state.codigo}
                onChange={(event) => {
                    this.setState({ codigo: event.target.value })
                }}
                label="Codigo"
                enabled="false"
            />
        </Grid>
        components.push(newComponent)
        for (var key in json_parsed) {
            if (json_parsed.hasOwnProperty(key)) {

                if (key.indexOf("texto") > -1) {
                    newComponent = <Grid className={classes.grid} item xs={4}>
                        <TextField
                            style={{ width: '21vw', marginBottom: '3em' }}
                            id={json_parsed[key]}
                            value={this.state[json_parsed[key]]}
                            onChange={(event) => {
                                this.setState({ [event.target.id]: event.target.value })
                            }}
                            label={json_parsed[key]}
                            enabled="false"
                        />
                    </Grid>
                    components.push(newComponent)

                }
                if (key.indexOf("numero") > -1) {
                    newComponent = <Grid className={classes.grid} item xs={4}>
                        <TextField
                            style={{ width: '21vw', marginBottom: '3em' }}
                            id={json_parsed[key]}
                            label={json_parsed[key]}
                            value={this.state[json_parsed[key]]}
                            onChange={(event) => {
                                this.setState({ [event.target.id]: event.target.value })
                            }}
                            type="number"
                        />
                    </Grid>
                    components.push(newComponent)
                }
                if (key.indexOf("booleano") > -1) {
                    newComponent = <Grid className={classes.grid} item xs={4}>
                        <FormControlLabel
                            style={{ width: '21vw', marginBottom: '3em' }}
                            control={
                                <Checkbox
                                    id={json_parsed[key]}
                                    checked={this.state[json_parsed[key]]}
                                    onChange={(event) => {
                                        this.setState({ [event.target.name]: event.target.checked })
                                    }}
                                />
                            }
                            name={json_parsed[key]}
                            label={json_parsed[key]}
                        />
                    </Grid>
                    components.push(newComponent)
                }
                if (key.indexOf("fechaHora") > -1) {
                    newComponent = <Grid  className={classes.grid} item xs={4}>
                        <DateTimePicker
                            keyboard
                            label={json_parsed[key]}
                            onError={console.log}
                            value={this.state[json_parsed[key]]}
                            onChange={this.handleDateChange.bind(this, json_parsed[key])}
                            format="YYYY-MM-DD HH:mm"
                        />

                    </Grid>
                    components.push(newComponent)
                }
            }
        }
        return components
    }

    saveRecord() {
        store.dispatch(postRecord(this.state))
    }

    render() {
        myComponents = this.getComponents()
        const { classes, theme } = this.props
        return (
            <FormGroup className={classes.root}>
                <Grid container spacing={0}>
                    {myComponents}
                </Grid>
            </FormGroup>
        )
    }
}
Record.propTypes = {
    classes: PropTypes.object,
    theme: PropTypes.object,
    data: PropTypes.object,
    registro: PropTypes.object
};
export default withTheme()(withStyles(styles)(Record))