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
import List from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Add'
import Export from '@material-ui/icons/GetApp'
import Back from '@material-ui/icons/Reply'
import Excel from '@material-ui/icons/Explicit'
import Pdf from '@material-ui/icons/PictureAsPdf'
import store from '../../../../store/store'
import {default as ExcelFile, ExcelSheet} from "react-data-export"
import { Document, Page } from 'react-pdf';

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


let RecordsToolbar = props => {
  const { numSelected, classes, onEditClick, onDeleteClick, onAddClick, onPdf, onReturnTables, tabla, registros, handleExportClose, handleExportClick, anchorEl } = props
  var anchor = null
  var multiDataSet = []
  if(registros.registros.length!=0){
    multiDataSet = [
      {
          columns:["idRegistro", "codigo"],
          data: []
      }
    ]
    for (var i = 0; i < registros.registros.length; i++) {
      multiDataSet[0].data.push([registros.registros[i].idRegistro,registros.registros[i].codigo])
    }
  }

  var iconButon
  if (numSelected == 0) {
    iconButon =
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Tooltip title="Tablas">
            <IconButton aria-label="Tablas" onClick={onReturnTables}>
              <Back />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            aria-label="More"
            aria-haspopup="true"
            onClick={handleExportClick}
          >
            <Export />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onRequestClose={handleExportClose}
          >
          <ExcelFile  element={(
              <MenuItem onClick={handleExportClose}>Excel</MenuItem>)}>
            <ExcelSheet dataSet={multiDataSet} name="Registros" />
          </ExcelFile>
            <MenuItem onClick={onPdf}>Pdf</MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Agregar">
            <IconButton aria-label="Agregar" onClick={onAddClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
  }
  if (numSelected == 1) {
    iconButon = <div>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Tooltip title="Tablas">
            <IconButton aria-label="Tablas" onClick={onReturnTables}>
              <Back />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Tooltip title="Edit">
            <IconButton aria-label="Edit" onClick={onEditClick}>
              <Edit />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={onDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Tooltip title="Agregar">
            <IconButton aria-label="Agregar" onClick={onAddClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  }

  if (numSelected > 1) {
    iconButon =
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Tooltip title="Tablas">
            <IconButton aria-label="Tablas" onClick={onReturnTables}>
              <Back />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={onDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Agregar">
            <IconButton aria-label="Agregar" onClick={onAddClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
  }

  

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
            <Typography type="title">{tabla.nombre}</Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {iconButon}
      </div>
    </Toolbar>
  )
}

RecordsToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

RecordsToolbar = withStyles(toolbarStyles)(RecordsToolbar)
export default RecordsToolbar