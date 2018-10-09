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
import FilesToolbar from './FilesToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchFilesList, deleteFile } from '../../../store/actions/files/filesActions'
import { getFile, newFile } from '../../../store/actions/files/fileActions'
import ReactTable from "react-table"
import "react-table/react-table.css"
import {default as ExcelFile, ExcelSheet} from "react-data-export"

const styles = theme => ({
  root: {
    maxWidth: '90vw',
    marginTop: theme.spacing.unit * 3,
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
    legajos: store.legajos,
    deleted: store.legajos.deleted,
    company: store.login.companyId
  }
})

class Files extends React.Component {
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
    this.newFile = this.newFile.bind(this)
    this.editFile = this.editFile.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.legajos.legajos.map(n => n.idLegajo),
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

  newFile = (event) => {
    store.dispatch(newFile())
    const { history } = this.props
    history.push('/legajo/new')
  }

  editFile = (event, selected) => {
    store.dispatch(getFile(this.props.legajos.legajos, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/legajo/' + selected,
      state: { idLegajo: selected }
    })
  }

  deleteFile = (event, selected) => {
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
    store.dispatch(deleteFile(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Legajo", "Cuil", "Apellido", "Nombre"]
    var rows = []

    for (var i = 0; i < this.props.legajos.legajos.length; i++) {
      rows.push([this.props.legajos.legajos[i].legajo,this.props.legajos.legajos[i].cuil,this.props.legajos.legajos[i].apellido,this.props.legajos.legajos[i].nombre])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    // Only pt supported (not mm or in) 
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('table.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(newFile())
    store.dispatch(fetchFilesList(this.props.company))
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchFilesList(this.props.company))
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.legajos.legajos.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <FilesToolbar numSelected={selected.length}
          onEditClick={event => this.editFile(event, selected)}
          onDeleteClick={event => this.deleteFile(event, selected)}
          onAddClick={event => this.newFile(event, selected)}
          onPdf={event => this.onPdf()}
          legajos={this.props.legajos}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.legajos.legajos}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idLegajo) !== -1}
                      onChange={() => this.handleClick(original.idLegajo)}
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
                Header: "Legajo",
                accessor: "legajo"
              },
              {
                Header: "Cuil",
                accessor:"cuil"
              },
              {
                Header: "Apellido",
                accessor: "apellido"
              },
              {
                Header: "Nombre",
                accessor: "nombre"
              },
              {
                Header: "Empreso",
                accessor: "empresa.descripcion"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.legajos.legajos.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Files.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Files))