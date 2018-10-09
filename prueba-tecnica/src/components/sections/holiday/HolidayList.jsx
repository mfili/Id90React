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
import HolidayToolbar from './HolidayToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchHolidayList, deleteHoliday } from '../../../store/actions/holiday/holidaysActions'
import { getHoliday, newHoliday } from '../../../store/actions/holiday/holidayActions'
import ReactTable from "react-table"
import "react-table/react-table.css"
import {default as ExcelFile, ExcelSheet} from "react-data-export"

const styles = theme => ({
  root: {
    maxWidth: '50vw',
    marginLeft: '5vw'
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
    vacaciones: store.vacaciones,
    deleted: store.ausentismos.deleted
  }
})

class HolidayList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      order: 'asc',
      orderBy: 'codigo',
      page: 0,
      rowsPerPage: 5,
      openDialog: false,
      selected: [], 
      selectAll: 0,
      anchorEl: null
    }
    this.newHoliday = this.newHoliday.bind(this)
    this.editHoliday = this.editHoliday.bind(this)
    this.deleteHoliday = this.deleteHoliday.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.vacaciones.vacaciones.map(n => n.idVacaciones),
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

  newHoliday = (event) => {
    store.dispatch(newHoliday())
    const { history } = this.props
    history.push('/vacaciones/new')
  }

  editHoliday = (event, selected) => {
    store.dispatch(getHoliday(this.props.vacaciones.vacaciones, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/vacaciones/' + selected,
      state: { idAusentismo: selected }
    })
  }

  deleteHoliday = (event, selected) => {
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
    store.dispatch(deleteHoliday(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Código", "Fecha Inicio", "FechaInicio Fin", "Numero Dias"]
    var rows = []

    for (var i = 0; i < this.props.vacaciones.vacaciones.length; i++) {
      rows.push([this.props.vacaciones.vacaciones[i].idVacaciones,
                  this.props.vacaciones.vacaciones[i].fechaInicio,
                  this.props.vacaciones.vacaciones[i].fechaFin,
                  this.props.vacaciones.vacaciones[i].numeroDias])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows,{
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {columnWidth: 'wrap'}
  })
    doc.save('vacaciones.pdf')
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
    store.dispatch(newHoliday())
    store.dispatch(fetchHolidayList())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchHolidayList())
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.vacaciones.vacaciones.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <HolidayToolbar numSelected={selected.length}
          onEditClick={event => this.editHoliday(event, selected)}
          onDeleteClick={event => this.deleteHoliday(event, selected)}
          onAddClick={event => this.newHoliday(event, selected)}
          onPdf={event => this.onPdf()}
          onReturnFiles={event => this.returnFiles()}
          vacaciones={this.props.vacaciones}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.vacaciones.vacaciones}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idVacaciones) !== -1}
                      onChange={() => this.handleClick(original.idVacaciones)}
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
                accessor: "idVacaciones"
              },
              {
                Header: "Fecha Inicio",
                accessor:"fechaInicio"
              },
              {
                Header: "Fecha Fin",
                accessor: "fechaFin"
              },
              {
                Header: "Numero Dias",
                accessor: "numeroDias"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.vacaciones.vacaciones.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

HolidayList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(HolidayList))