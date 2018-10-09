import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import  { Input,InputLabel } from '@material-ui/core'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Grid from '@material-ui/core/Grid'
import ClearIcon from '@material-ui/icons/Clear'
import Select from 'react-select'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import store from '../../../store/store'
import 'react-select/dist/react-select.css'
import '../../../style/autocomplete.css'

var option = {}

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event)
    option = this.props.option
  }

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    )
  }
}


class SelectWrapped extends React.Component {
  render() {
    const { classes, ...other } = this.props
    return (
      <Select style={{height:'auto!important'}}
        className={classes.select}
        optionComponent={Option}
        noResultsText={<Typography>{'No results found'}</Typography>}
        arrowRenderer={arrowProps => {
          return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
        }}
        clearRenderer={() => <ClearIcon />}
        valueComponent={valueProps => {
          const { value, children, onRemove } = valueProps

          return <div className="Select-value">{children}</div>
        }}
        {...other}
      />
    )
  }
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 200,
    width: 200
  },
  formControl: {
      marginTop: '1em'
  },
  select: {
      width: '15vw',
      marginTop: '1em'
  },
  field: {
      width: '15vw'
  },
  form: {
      width: '40vw',
      marginTop: '3vh',
      padding: 0,
      height: '45vh',
  },
  
});


class FormDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      single: '',
      id:null,
      descripcion:''
    }
  }
  
  handleChangeSingle = single  => {
    this.setState({
      single ,
      id: option.id,
      descripcion: option.descripcion
    })
    this.props.setData(option.id, option.value)
  }

  render() {
    const { classes } = this.props
    const { single } = this.state
    const suggestions = this.props.dataList.map(data => ({
      label: data[this.props.idComponent] + '-' + data.descripcion,
      value: data[this.props.idComponent] + '-' + data.descripcion,
      id: data[this.props.idComponent],
      descripcion: data.descripcion
    }))
    return (
      <div>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          inputProps={{
            classes,
            value: single,
            onChange: this.handleChangeSingle,
            placeholder: this.props.titleDialog,
            instanceId: 'react-select-single',
            id: 'react-select-single',
            name: 'react-select-single',
            simpleValue: true,
            options: suggestions,
          }}
        />
        <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <TextField className={classes.field}
                                id={this.props.idComponent}
                                label="Id"
                                value={this.state.id}
                                enabled="false"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField className={classes.field}
                                id="descripcion"
                                label="Descripción"
                                value={this.state.descripcion}
                                enabled="false"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
        </form>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  titleDialog: PropTypes.string,
  setData: PropTypes.func,
  dataList:PropTypes.object,
  idComponent:PropTypes.string
}

export default withStyles(styles)(FormDialog);