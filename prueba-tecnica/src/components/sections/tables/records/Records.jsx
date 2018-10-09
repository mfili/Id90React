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
import DeleteDialog from '../../DeleteDialog.jsx'
import RecordsToolbar from './RecordsToolbar.jsx'
import store from '../../../../store/store'
import { connect } from 'react-redux'
import { fetchRecordsList, deleteRecord } from '../../../../store/actions/tables/records/recordsActions'
import { getRecord, newRecord } from '../../../../store/actions/tables/records/recordActions'
import ReactTable from "react-table"
import "react-table/react-table.css"
import {default as ExcelFile, ExcelSheet} from "react-data-export"

var loading

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
  loading = true
  return {
    registros: store.registros,
    company: store.login.companyId,
    selectedTable: store.tabla.selectedTable,
    tabla: store.tabla.tableRecords
  }
})

class Records extends React.Component {
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
    this.newRecord = this.newRecord.bind(this)
    this.editRecord = this.editRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.registros.registros.map(n => n.idRegistro),
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

  newRecord = (event) => {
    store.dispatch(newRecord())
    const { history } = this.props
    history.push('/registros/new')
  }

  editRecord = (event, selected) => {
    store.dispatch(getRecord(this.props.registros.registros, selected[0]))
    const { history } = this.props
    history.push({
      pathname: 'registros/' + selected,
      state: { idRegistro: selected }
    })
  }
  
  deleteRecord = (event, selected) => {
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
    store.dispatch(deleteRecord(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["idRegistro", "codigo"]
    var rows = []

    for (var i = 0; i < this.props.registros.registros.length; i++) {
      rows.push([this.props.registros.registros[i].idRegistro,
                  this.props.registros.registros[i].codigo])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows)
    doc.save('registros.pdf')
    this.handleExportClose()
  }

  returnTables = () => {
    const { history } = this.props
    history.push('/tablas')
  }
  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(fetchRecordsList(this.props.company,this.props.selectedTable))
  }

  

  render() {
    
    loading = false
    if(this.props.deleted == true){
      store.dispatch(fetchRecordsList(this.props.company,this.props.selectedTable))
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.registros.registros.length - page * rowsPerPage)
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <RecordsToolbar numSelected={selected.length}
          onEditClick={event => this.editRecord(event, selected)}
          onDeleteClick={event => this.deleteRecord(event, selected)}
          onAddClick={event => this.newRecord(event, selected)}
          onPdf={event => this.onPdf()}
          onReturnTables={event => this.returnTables()}
          tabla={this.props.tabla}
          registros={this.props.registros}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.registros.registros}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idRegistro) !== -1}
                      onChange={() => this.handleClick(original.idRegistro)}
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
                accessor: "codigo"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={loading}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Records.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Records))