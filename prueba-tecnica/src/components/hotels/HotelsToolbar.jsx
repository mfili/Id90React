import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {Menu, IconMenu, MenuItem } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Export from '@material-ui/icons/GetApp'
import Excel from '@material-ui/icons/Explicit'
import Pdf from '@material-ui/icons/PictureAsPdf'
import store from '../../store/store'
import {default as ExcelFile, ExcelSheet} from "react-data-export"
import { Document, Page } from 'react-pdf'

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
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
  backgroundRed: {
    backgroundColor: '#FF7043',
  },

  backgroundBlue: theme.palette.type === 'light'
  ? {
    color: theme.palette.primary.A700,
    backgroundColor: theme.palette.primary.A100,
  }
  : {
    color: theme.palette.primary.A100,
    backgroundColor: theme.palette.primary.A700,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
})


let HotelsToolbar = props => {
  const { numSelected, classes } = props
  var anchor = null
   
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.backgroundGreen]: numSelected == 1,
      }, {
          [classes.backgroundRed]: numSelected > 1,
        },{
          [classes.backgroundBlue]: numSelected === 0,
        })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
            <Typography type="title">Hoteles Disponibles</Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
      </div>
    </Toolbar>
  )
}

HotelsToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

HotelsToolbar = withStyles(toolbarStyles)(HotelsToolbar)
export default HotelsToolbar