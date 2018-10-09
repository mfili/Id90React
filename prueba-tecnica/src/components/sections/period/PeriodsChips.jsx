import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {  Input, InputLabel } from '@material-ui/core'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ClearIcon from '@material-ui/icons/Clear'
import Chip from '@material-ui/core/Chip'
import Select from 'react-select'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import store from '../../../store/store'
import 'react-select/dist/react-select.css'
import { setPeriods } from '../../../store/actions/period/periodActions'


class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event)
  }

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

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
    );
  }
}

class SelectWrapped extends React.Component {
  render() {
    const { classes, ...other } = this.props
    return (
      <Select style={{height:'auto!important'}}
        optionComponent={Option}
        noResultsText={<Typography>{'No results found'}</Typography>}
        arrowRenderer={arrowProps => {
          return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
        }}
        clearRenderer={() => <ClearIcon />}
        valueComponent={valueProps => {
          const { value, children, onRemove } = valueProps
          if (onRemove) {
            return (
              <Chip
                tabIndex={-1}
                label={children}
                className={classes.chip}
                onDelete={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  onRemove(value);
                }}
              />
            );
          }

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
    width: 200,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  formControl: {
      marginTop: '1em',
      width: '65vw'
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
var periodosId = []
@connect((store) => {
  return {
      periodos: store.periodos.periodos,
      mapaItem: store.mapaItem.periodo,
      item: store.item.periodo,
      itemsPeriodos:store.periodo.itemsPeriodos
  }
})

class PeriodsChips extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      multi: this.loadChips()
    }
  }
  
  handleChangeMulti = multi => {
    periodosId = []
    this.setState({
      multi,
    })
    periodosId = multi.split(',')
    store.dispatch(setPeriods(periodosId))
  }

  loadChips(){
    var multi = ''
    if(this.props.itemsPeriodos.length!=0){
      multi=multi +  this.props.itemsPeriodos + ','
    }else{
        if (this.props[this.props.component]) {
            for (var i = 0; i < this.props[this.props.component].length; i++) {
              multi = multi  + this.props[this.props.component][i].idPeriodo + ','
            }
        }
    }
    periodosId = multi.split(',')
    store.dispatch(setPeriods(periodosId))

    return multi
  }

  render() {
    const { classes } = this.props
    const { multi } = this.state
    const suggestions = this.props.periodos.map(periodo => ({
      value: periodo.idPeriodo,
      label: periodo.descripcion,
    }))
    return (
      <FormControl className={classes.formControl}>
      <InputLabel htmlFor="name" >Periodos</InputLabel>
        <Input
          fullWidth
          value=' '
          inputComponent={SelectWrapped}
          inputProps={{
            classes,
            value: multi ,
            multi: true,
            onChange: this.handleChangeMulti,
            placeholder: 'Seleccione acumuladores',
            instanceId: 'react-select-chip',
            id: 'react-select-chip',
            name: 'react-select-chip',
            simpleValue: true,
            options: suggestions

          }}
        />
        </FormControl>
    );
  }
}

PeriodsChips.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.string
};

export default withStyles(styles)(PeriodsChips);