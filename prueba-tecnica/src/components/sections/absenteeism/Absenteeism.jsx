import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import keycode from 'keycode'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import DeleteDialog from '../DeleteDialog.jsx'
import AbsenteeismToolbar from './AbsenteeismToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchAbsenteeismList, deleteAbsenteeism } from '../../../store/actions/absenteeism/ausentismosActions'
import { getAbsenteeism, newAbsenteeism } from '../../../store/actions/absenteeism/ausentismoActions'
import ReactTable from "react-table"
import "react-table/react-table.css"
import {default as ExcelFile, ExcelSheet} from "react-data-export"

const styles = theme => ({
  root: {
    maxWidth: '80vw',
    marginTop: theme.spacing.unit * 3,
    marginLeft: '10vw'
  },
  table: {
    minWidth: 600,
    height: '60vh'
  },
  tableWrapper: {
    overflowX: 'auto',
    height: '100%'
  }
})

@connect((store) => {
  return {
    idLegajo: store.legajo.idLegajo,
    ausentismos: store.ausentismos,
    deleted: store.ausentismos.deleted
  }
})

class Absenteeism extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      order: 'asc',
      orderBy: 'codigo',
      page: 0,
      rowsPerPage: 10,
      openDialog: false,
      selected: [], 
      selectAll: 0,
      anchorEl: null
    }
    this.newAbsenteeism = this.newAbsenteeism.bind(this)
    this.editAbsenteeism = this.editAbsenteeism.bind(this)
    this.deleteAbsenteeism = this.deleteAbsenteeism.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.ausentismos.ausentismos.map(n => n.idAusentismo),
        selectAll: this.state.selectAll === 0 ? 1 : 0  
      })
      return
		}
    this.setState({ 
      selected: [],
      selectAll: this.state.selectAll === 0 ? 1 : 0 
    })
	}

  handleClick = (id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected,selectAll: 2 })
  }

  handleChangeRowsPerPage = size => {
    this.setState({ rowsPerPage: size})
  }

  newAbsenteeism = (event) => {
    store.dispatch(newAbsenteeism())
    const { history } = this.props
    history.push('/ausentismo/new')
  }

  editAbsenteeism = (event, selected) => {
    store.dispatch(getAbsenteeism(this.props.ausentismos.ausentismos, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/ausentismo/' + selected,
      state: { idAusentismo: selected }
    })
  }

  deleteAbsenteeism = (event, selected) => {
    this.setState({
      openDialog: true
    })
  }

  closeDialog = (event, selected) => {
    this.setState({
      openDialog: false
    })
  }

  aceptDialog = (event) => {
    store.dispatch(deleteAbsenteeism(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Código", "Fecha Real", "FechaInicio Aplicacion", "Numero Dias", "Fecha Termino Aplicacion", "Fecha Termino Real"]
    var rows = []

    for (var i = 0; i < this.props.ausentismos.ausentismos.length; i++) {
      rows.push([this.props.ausentismos.ausentismos[i].idAusentismo,
                  this.props.ausentismos.ausentismos[i].fechaReal,
                  this.props.ausentismos.ausentismos[i].fechaInicioAplicacion,
                  this.props.ausentismos.ausentismos[i].numeroDias,
                  this.props.ausentismos.ausentismos[i].fechaTerminoAplicacion,
                  this.props.ausentismos.ausentismos[i].fechaTerminoReal])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows,{
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {columnWidth: 'wrap'}
  })
    doc.save('ausentismos.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  returnFiles = () => {
    const { history } = this.props
    history.push('/legajo/'+ this.props.idLegajo)
  }

  componentDidMount() {
    store.dispatch(newAbsenteeism())
    store.dispatch(fetchAbsenteeismList())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchAbsenteeismList())
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.ausentismos.ausentismos.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <AbsenteeismToolbar numSelected={selected.length}
          onEditClick={event => this.editAbsenteeism(event, selected)}
          onDeleteClick={event => this.deleteAbsenteeism(event, selected)}
          onAddClick={event => this.newAbsenteeism(event, selected)}
          onPdf={event => this.onPdf()}
          onReturnFiles={event => this.returnFiles()}
          ausentismos={this.props.ausentismos}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.ausentismos.ausentismos}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idAusentismo) !== -1}
                      onChange={() => this.handleClick(original.idAusentismo)}
                    />
                  );
                },
                Header: x => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selectAll === 1}
                      ref={input => {
                        if (input) {
                          input.indeterminate = this.state.selectAll === 2;
                        }
                      }}
                      onChange={() => this.toggleSelectAll()}
                    />
                  );
                },
                sortable: false,
                width: 45
              },
              {
                Header: "Codigo",
                accessor: "idAusentismo"
              },
              {
                Header: "Fecha Real",
                accessor:"fechaReal"
              },
              {
                Header: "FechaInicio Aplicacion",
                accessor: "fechaInicioAplicacion"
              },
              {
                Header: "Numero Dias",
                accessor: "numeroDias"
              },
              {
                Header: "Fecha Termino Aplicacion",
                accessor: "fechaTerminoAplicacion"
              },
              {
                Header: "Fecha Termino Real",
                accessor: "fechaTerminoReal"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.ausentismos.ausentismos.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Absenteeism.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Absenteeism))