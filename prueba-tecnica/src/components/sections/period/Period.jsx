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
import PeriodToolbar from './PeriodToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchPeriodList, deletePeriod } from '../../../store/actions/period/periodsActions'
import { getPeriod, newPeriod } from '../../../store/actions/period/periodActions'
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
    periodos: store.periodos,
    deleted: store.periodos.deleted
  }
})

class Period extends React.Component {
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
    this.newPeriod = this.newPeriod.bind(this)
    this.editPeriod = this.editPeriod.bind(this)
    this.deletePeriod = this.deletePeriod.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.periodos.periodos.map(n => n.idPeriodo),
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

  newPeriod = (event) => {
    store.dispatch(newPeriod())
    const { history } = this.props
    history.push('/periodo/new')
  }

  editPeriod = (event, selected) => {
    store.dispatch(getPeriod(this.props.periodos.periodos, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/periodo/' + selected,
      state: { idPeriodo: selected }
    })
  }

  deletePeriod = (event, selected) => {
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
    store.dispatch(deletePeriod(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Número Período", "Estado", "Descripción", "Día Inicial", "Duración Días"]
    var rows = []

    for (var i = 0; i < this.props.periodos.periodos.length; i++) {
      rows.push([this.props.periodos.periodos[i].nroPeriodo,
                  this.props.periodos.periodos[i].estado,
                  this.props.periodos.periodos[i].descripcion,
                  this.props.periodos.periodos[i].diaInicio,
                  this.props.periodos.periodos[i].duracionDias])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows,{
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {columnWidth: 'wrap'}
  })
    doc.save('periodos.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(newPeriod())
    store.dispatch(fetchPeriodList())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchPeriodList())
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.periodos.periodos.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <PeriodToolbar numSelected={selected.length}
          onEditClick={event => this.editPeriod(event, selected)}
          onDeleteClick={event => this.deletePeriod(event, selected)}
          onAddClick={event => this.newPeriod(event, selected)}
          onPdf={event => this.onPdf()}
          onReturnFiles={event => this.returnFiles()}
          periodos={this.props.periodos}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.periodos.periodos}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idPeriodo) !== -1}
                      onChange={() => this.handleClick(original.idPeriodo)}
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
                Header: "Número de Período",
                accessor: "nroPeriodo"
              },
              {
                Header: "Estado",
                accessor:"estado"
              },
              {
                Header: "Descripción",
                accessor: "descripcion"
              },
              {
                Header: "Dia Inicio",
                accessor: "diaInicio"
              },
              {
                Header: "Duracion Dias",
                accessor: "duracionDias"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.periodos.periodos.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Period.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Period))