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
import ItemsToolbar from './ItemsToolbar.jsx'
import store from '../../../../store/store'
import { connect } from 'react-redux'
import { fetchClassItemList, deleteClassItem } from '../../../../store/actions/class/items/itemsActions'
import { getClassItem, newClassItem } from '../../../../store/actions/class/items/itemActions'
import {  clearPeriods } from '../../../../store/actions/period/periodActions'
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
    items: store.items,
    idClase: store.clase.idClase,
    deleted: store.items.deleted
  }
})

class Items extends React.Component {
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
    this.newClassItem = this.newClassItem.bind(this)
    this.editClassItem = this.editClassItem.bind(this)
    this.deleteClassItem = this.deleteClassItem.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.items.items.map(n => n.idClaseItem),
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
  newClassItem = (event) => {
    store.dispatch(newClassItem())
    const { history } = this.props
    history.push('/items/new')
  }

  editClassItem = (event, selected) => {
    store.dispatch(getClassItem(this.props.items.items, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/items/' + selected,
      state: { idClaseItem: selected }
    })
  }

  deleteClassItem = (event, selected) => {
    this.setState({
      openDialog: true
    })
  }

  closeDialog = (event, selected) => {
    this.setState({
      openDialog: false
    })
  }

  returnClase = () => {
    const { history } = this.props
    history.push('/clase')
  }

  aceptDialog = (event) => {
    store.dispatch(deleteClassItem(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    /*var columns = ["Código", "Descripción"]
    var rows = []

    for (var i = 0; i < this.props.items.items.length; i++) {
      rows.push([this.props.items.items[i].idItem,
                  this.props.items.items[i].descripcion])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows,{
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {columnWidth: 'wrap'}
  })
    doc.save('clases.pdf')
    this.handleExportClose()*/
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(newClassItem())
    store.dispatch(fetchClassItemList(this.props.idClase))
    store.dispatch(clearPeriods())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchClassItemList(this.props.idClase))
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.items.items.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <ItemsToolbar numSelected={selected.length}
          onEditClick={event => this.editClassItem(event, selected)}
          onDeleteClick={event => this.deleteClassItem(event, selected)}
          onAddClick={event => this.newClassItem(event, selected)}
          onReturnClase={event => this.returnClase(event, selected)}
          onPdf={event => this.onPdf()}
          items={this.props.items}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.items.items}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idClaseItem) !== -1}
                      onChange={() => this.handleClick(original.idClaseItem)}
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
                Header: "Codigo Item",
                accessor: "items.codigoConcepto"
              },
              {
                Header: "Descripcion",
                accessor:"items.descripcionConcepto"
              },
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.items.items.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Items.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Items))