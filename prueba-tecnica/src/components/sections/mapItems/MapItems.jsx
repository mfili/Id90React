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
import {Menu, IconMenu, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import DeleteDialog from '../DeleteDialog.jsx'
import NoDeleteDialog from './NoDeleteDialog.jsx'
import MapItemsToolbar from './MapItemsToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchPeriodList } from '../../../store/actions/period/periodsActions'
import { getMapItem, newMapItem } from '../../../store/actions/mapItem/mapItemActions'
import { fetchClassItemList, fetchItemPeriodList } from '../../../store/actions/class/items/itemsActions'
import { fetchMapItemList, deleteMapItem } from '../../../store/actions/mapItem/mapItemsActions'
import {  clearPeriods } from '../../../store/actions/period/periodActions'
import ReactTable from "react-table"
import "react-table/react-table.css"
import {default as ExcelFile, ExcelSheet} from "react-data-export"

var periodo = {}

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
  var items = []
  var lodash = require('lodash')
  for (var i = 0; i < store.mapaItems.mapaItems.length; i++){
    var descripcionPeriodos = ''
    var idsPeriodos = []
    for (var j = 0; j < store.mapaItems.mapaItems[i].periodo.length; j++){
      if(j<store.mapaItems.mapaItems[i].periodo.length-1){
        descripcionPeriodos = descripcionPeriodos + store.mapaItems.mapaItems[i].periodo[j].descripcion +','
      }else{
        descripcionPeriodos = descripcionPeriodos + store.mapaItems.mapaItems[i].periodo[j].descripcion 
      }
      idsPeriodos.push(store.mapaItems.mapaItems[i].periodo[j].idPeriodo)
    }
    console.log("IDS",idsPeriodos)
    items.push({
      "tipo": 'empleado',
      "items": store.mapaItems.mapaItems[i],
      "descripcionPeriodos": descripcionPeriodos
    })
  }

  for (var i = 0; i < store.items.items.length; i++){
    var exist = false
      for(var j = 0; j < store.mapaItems.mapaItems.length; j++){
        if(store.items.items[i].items.idConcepto == store.mapaItems.mapaItems[j].items.idConcepto){
          exist = true
        }
      }
      if(!exist){
        items.push({
          "tipo": 'clase',
          "items": store.items.items[i]
        })
      }
  }
  return {
    idLegajo: store.legajo.idLegajo,
    legajo: store.legajo,
    items: items,
    claseItems: store.items.items,
    mapaItems: store.mapaItems.mapaItems,
    periodos: store.periodos.periodos,
    deleted: store.mapaItems.deleted
  }
})

class MapItems extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      order: 'asc',
      orderBy: 'codigo',
      page: 0,
      rowsPerPage: 10,
      openDialog: false,
      openNoDelete: false,
      selected: [], 
      selectAll: 0,
      anchorEl: null,
      anchorPe: null
    }
    this.newMapItem = this.newMapItem.bind(this)
    this.editMapItem = this.editMapItem.bind(this)
    this.deleteMapItem = this.deleteMapItem.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.items.map(n => n.items.items.idConcepto ),
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

  newMapItem = (event) => {
    store.dispatch(newMapItem())
    const { history } = this.props
    history.push('/mapaItems/new')
  }

  editMapItem = (event, selected) => {
    store.dispatch(getMapItem(this.props.items, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/mapaItems/' + selected,
      state: { idClaseItem: selected }
    })
  }

  deleteMapItem = (event, selected) => {
    var selected = this.state.selected[0]
    var lodash = require('lodash')
      var item = lodash.find(this.props.items,function(item) {
        return item.items.items.idConcepto===selected
      })
      if(item.tipo=='empleado'){
        this.setState({
          openDialog: true
        })
      }else{
        this.setState({
          openNoDelete: true
        })
      }
  }

  closeDialog = (event, selected) => {
    this.setState({
      openDialog: false
    })
  }

  aceptDialog = (event) => {
    var selected = this.state.selected[0]
    var lodash = require('lodash')
    var item = lodash.find(this.props.items,function(item) {
      return item.items.items.idConcepto===selected
    })
    store.dispatch(deleteMapItem(item.items.idMapaItem))
    this.closeDialog()
  }

  aceptNoDelete = (event) => {
    this.setState({
      openNoDelete: false
    })
  }
  
  onPdf = (event) => {
    var columns = ["Código", "Descripción", "Período"]
    var rows = []

    for (var i = 0; i < this.props.items.length; i++) {
      rows.push([this.props.items[i].items.codigoConcepto,
                  this.props.items[i].items.descripcionConcepto,
                  this.props.items[i].periodo.descripcion])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows)
    doc.save('mapaItems.pdf')
    this.handleExportClose()
  }
  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }
  
  createPeriodMenuItem() {
    var items = []
    if (this.props.periodos) {
        for (var i = 0; i < this.props.periodos.length; i++) {
            items.push(
                <option value={this.props.periodos[i].descripcion}>{this.props.periodos[i].descripcion}</option>
            )
        }
    }
    return items
}

  returnFiles = () => {
    const { history } = this.props
    history.push('/legajo/' + this.props.idLegajo)
  }

  componentDidMount() {
    store.dispatch(fetchClassItemList())
    store.dispatch(fetchMapItemList(this.props.legajo.idLegajo))
    store.dispatch(clearPeriods())
    store.dispatch(fetchPeriodList())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchClassItemList())
      store.dispatch(fetchMapItemList(this.props.legajo.idLegajo))
      store.dispatch(fetchPeriodList())
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.items.length - page * rowsPerPage)
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <NoDeleteDialog className={classes.dialog} openNoDelete={this.state.openNoDelete} aceptNoDelete={this.aceptNoDelete}/>
        <MapItemsToolbar numSelected={selected.length}
          onEditClick={event => this.editMapItem(event, selected)}
          onDeleteClick={event => this.deleteMapItem(event, selected)}
          onAddClick={event => this.newMapItem(event, selected)}
          items={this.props.items}
          onPdf={event => this.onPdf()}
          onReturnFiles={event => this.returnFiles()}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.items}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.items.items.idConcepto) !== -1}
                      onChange={() => this.handleClick(original.items.items.idConcepto)}
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
                Header: "Tipo de Item",
                accessor: "tipo",
                filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value) 
              },
              {
                Header: "Código",
                accessor: "items.items.codigoConcepto",
                filterMethod: (filter, row) =>
                  row[filter.id].startsWith(filter.value) 
              },
              {
                Header: "Descripción",
                accessor:"items.items.descripcionConcepto",
                filterMethod: (filter, row) =>
                  row[filter.id].startsWith(filter.value) 
              },
              {
                Header: "Periodo",
                accessor:"descripcionPeriodos",
                filterMethod: (filter, row) => {
                  if (filter.value === "0") {
                    console.log("FILTER",filter,"DATA",row)
                    return true;
                  }
                    return row[filter.id] == filter.value;
                },
                Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="0">Todos</option>
                    {this.createPeriodMenuItem()}
                  </select>
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.items.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

MapItems.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(MapItems))