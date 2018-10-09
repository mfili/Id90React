import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {  Input, InputLabel } from '@material-ui/core'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Grid from '@material-ui/core/Grid'
import ClearIcon from '@material-ui/icons/Clear'
import Chip from '@material-ui/core/Chip'
import Select from 'react-select'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import store from '../../../store/store'
import 'react-select/dist/react-select.css' 
import { saveFormula } from '../../../store/actions/formulas/formulaActions'

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
      width: '21vw',
      marginTop: '1em'
  },
  field: {
      width: '21vw'
  },
  form: {
      width: '40vw',
      marginTop: '3vh',
      padding: 0,
      height: '45vh',
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex!important',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,

    },
    '.Select--multi': {
      height: 'auto!important',
      
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

@connect((store) => {
  return {
      formulas: store.formulas.formulas
  }
})

class Formula extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      single: '',
      formulaCode:'',
      description:'',
      formula:''
    }
  }
  
  handleChangeSingle = single  => {
    this.setState({
      single ,
      formulaCode: option.formulaCode,
      description: option.description,
      formula: option.formula
    })
    store.dispatch(saveFormula(option.formulaCode, 'hola'))
  }

  render() {
    const { classes } = this.props
    const { single } = this.state
    const suggestions = this.props.formulas.map(formula => ({
      label: formula.codigoFormula + '-' + formula.descripcion,
      value: formula.codigoFormula + '-' + formula.descripcion,
      formulaCode: formula.codigoFormula,
      description: formula.descripcion,
      formula: formula.formula
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
            placeholder: 'Seleccione Fórmula',
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
                                id="formulaCode"
                                label="Código de Formula"
                                value={this.state.formulaCode}
                                enabled="false"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField className={classes.field}
                                id="description"
                                label="Descripción"
                                value={this.state.description}
                                enabled="false"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField className={classes.field}
                                id="formula"
                                label="Formula"
                                value={this.state.formula}
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

Formula.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Formula);