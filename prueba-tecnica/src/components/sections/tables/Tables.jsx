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
import TablesToolbar from './TablesToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchTablesList, deleteTable } from '../../../store/actions/tables/tablesActions'
import { getTable, newTable, selectedTable, getTableRecords } from '../../../store/actions/tables/tableActions'
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
    tablas: store.tablas,
    deleted: store.tablas.deleted,
    company: store.login.companyId
  }
})

class Tables extends React.Component {
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
    this.newTable = this.newTable.bind(this)
    this.editTable = this.editTable.bind(this)
    this.deleteTable = this.deleteTable.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.tablas.tablas.map(n => n.idTabla),
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

  newTable = (event) => {
    store.dispatch(newTable())
    const { history } = this.props
    history.push('/tablas/new')
  }

  editTable = (event, selected) => {
    store.dispatch(getTable(this.props.tablas.tablas, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/tablas/' + selected,
      state: { idTabla: selected }
    })
  }
  
  listRecords = (event, selected) => {
    store.dispatch(getTableRecords(selected[0]))
    store.dispatch(selectedTable(selected[0]))
    const { history } = this.props
    history.push({
      pathname: 'registros',
      state: { idTabla: selected }
    })
  }

  deleteTable = (event, selected) => {
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
    store.dispatch(deleteTable(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Id","Código", "Nombre"]
    var rows = []

    for (var i = 0; i < this.props.tablas.tablas.length; i++) {
      rows.push([this.props.tablas.tablas[i].idTabla,
                  this.props.tablas.tablas[i].codigo,
                  this.props.tablas.tablas[i].nombre])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows)
    doc.save('tablas.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(fetchTablesList(this.props.company))
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchTablesList(this.props.company))
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.tablas.tablas.length - page * rowsPerPage)
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <TablesToolbar numSelected={selected.length}
          onEditClick={event => this.editTable(event, selected)}
          listRecords={event => this.listRecords(event, selected)}
          onDeleteClick={event => this.deleteTable(event, selected)}
          onAddClick={event => this.newTable(event, selected)}
          onPdf={event => this.onPdf()}
          tablas={this.props.tablas}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.tablas.tablas}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idTabla) !== -1}
                      onChange={() => this.handleClick(original.idTabla)}
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
                Header: "id",
                accessor: "idTabla"
              },
              {
                Header: "Codigo",
                accessor: "codigo"
              },
              {
                Header: "Nombre",
                accessor:"nombre"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.tablas.tablas.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Tables.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Tables))