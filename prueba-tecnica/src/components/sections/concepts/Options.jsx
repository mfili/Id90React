import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  {withStyles}  from '@material-ui/core/styles'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import { InputLabel } from '@material-ui/core'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { changeValue } from '../../../store/actions/concepts/conceptActions'

const styles = theme => ({
    backgroundGreen:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.A700,
                backgroundColor: theme.palette.secondary.A100,
            }
            : {
                color: theme.palette.secondary.A100,
                backgroundColor: theme.palette.secondary.A700,
            },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    divGlobal: {
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '60vh'
    },
    formGroup: {
        margin: '2em 2em 0em 2em'
    },
    grid: {
        padding: '0px'
    },
    field: {
        width: '21vw'
    }
})

@connect((store) => {
    return {
        imprimeRec: store.concept.imprimeRec=='S'? true : false,
        inform: store.concept.inform=='S'? true : false,
        remvar: store.concept.remvar=='S'? true : false,
        rempimp1: store.concept.rempimp1=='S'? true : false,
        rempimp2: store.concept.rempimp2=='S'? true : false,
        rempimp3: store.concept.rempimp3=='S'? true : false,
        rempimp4: store.concept.rempimp4=='S'? true : false,
        rempimp5: store.concept.rempimp5=='S'? true : false,
        rempimp6: store.concept.rempimp6=='S'? true : false,
        rempimp7: store.concept.rempimp7=='S'? true : false,
        rempimp8: store.concept.rempimp8=='S'? true : false,
        rempimp9: store.concept.rempimp9=='S'? true : false,
        baseSac: store.concept.baseSac=='S'? true : false,
        baseVac: store.concept.baseVac=='S'? true : false,
        baseLic: store.concept.baseLic=='S'? true : false,
        baseAcc: store.concept.baseAcc=='S'? true : false,
        baseHHEE: store.concept.baseHHEE=='S'? true : false
    }
})

class Options extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    handleValueChange = (id,checked) => {
        store.dispatch(changeValue(id,checked?'S':'N'))
    }

    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.divGlobal}>
                <FormGroup className={classes.formGroup} >
                    <Grid container spacing={0}>
                        <Grid style={{ padding: '0px' }} item xs={12}>
                            <InputLabel htmlFor="name-helper">Imponibles</InputLabel>
                        </Grid>
                        <hr class="featurette-divider" style={{width: '100%'}}/>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp1}
                                        onChange={(e) => this.handleValueChange("rempimp1", !this.props.rempimp1)}
                                    />
                                }
                                label="Imponible 1"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={this.props.rempimp2}
                                    onChange={(e) => this.handleValueChange("rempimp2", !this.props.rempimp2)}
                                    />
                                }
                                label="Imponible 2"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp3}
                                        onChange={(e) => this.handleValueChange("rempimp3", !this.props.rempimp3)}
                                    />
                                }
                                label="Imponible 3"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp4}
                                        onChange={(e) => this.handleValueChange("rempimp4", !this.props.rempimp4)}
                                    />
                                }
                                label="Imponible 4"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp5}
                                        onChange={(e) => this.handleValueChange("rempimp5", !this.props.rempimp5)}
                                    />
                                }
                                label="Imponible 5"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp6}
                                        onChange={(e) => this.handleValueChange("rempimp6", !this.props.rempimp6)}
                                    />
                                }
                                label="Imponible 6"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp7}
                                        onChange={(e) => this.handleValueChange("rempimp7", !this.props.rempimp7)}
                                    />
                                }
                                label="Imponible 7"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp8}
                                        onChange={(e) => this.handleValueChange("rempimp8", !this.props.rempimp8)}
                                    />
                                }
                                label="Imponible 8"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.rempimp9}
                                        onChange={(e) => this.handleValueChange("rempimp9", !this.props.rempimp9)}
                                    />
                                }
                                label="Imponible 9"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={12}>
                            <InputLabel htmlFor="name-helper">Bases</InputLabel>
                        </Grid>
                        <hr class="featurette-divider" style={{width: '100%'}}/>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={this.props.baseSac}
                                        onChange={(e) => this.handleValueChange("baseSac", !this.props.baseSac)}
                                    />
                                }
                                label="Base SAC"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={this.props.baseVac}
                                        onChange={(e) => this.handleValueChange("baseVac", !this.props.baseVac)}
                                    />
                                }
                                label="Base Vacaciones"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel baseLic
                                control={
                                    <Checkbox
                                        checked={this.props.baseLic}
                                        onChange={(e) => this.handleValueChange("baseLic", !this.props.baseLic)}
                                    />
                                }
                                label="Base Licencias"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4}>
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={this.props.baseAcc}
                                        onChange={(e) => this.handleValueChange("baseAcc", !this.props.baseAcc)}
                                    />
                                }
                                label="Base Accidentes"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={8} >
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={this.props.baseHHEE}
                                        onChange={(e) => this.handleValueChange("baseHHEE", !this.props.baseHHEE)}
                                    />
                                }
                                label="Base HHEE"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={12} >
                            <InputLabel htmlFor="name-helper">Otros</InputLabel>
                        </Grid>
                        <hr class="featurette-divider" style={{width: '100%'}}/>
                        <Grid style={{ padding: '0px' }} item xs={4} >
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={this.props.imprimeRec}
                                        onChange={(e) => this.handleValueChange("imprimeRec", !this.props.imprimeRec)}
                                    />
                                }
                                label="Imprime"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4} >
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={this.props.inform}
                                        onChange={(e) => this.handleValueChange("inform", !this.props.inform)}
                                    />
                                }
                                label="Interno"
                            />
                        </Grid>
                        <Grid style={{ padding: '0px' }} item xs={4} >
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={this.props.remvar}
                                        onChange={(e) => this.handleValueChange("remvar", !this.props.remvar)}
                                    />
                                }
                                label="Remuneracion variable"
                            />
                        </Grid>
                    </Grid>
                </FormGroup>
            </div>
        )
    }
}

Options.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Options)