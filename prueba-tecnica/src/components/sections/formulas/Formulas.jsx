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
import FormulasToolbar from './FormulasToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchFormulasList, deleteFormula } from '../../../store/actions/formulas/formulasActions'
import { getFormula, newFormula } from '../../../store/actions/formulas/formulaActions'
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
    formulas: store.formulas,
    deleted: store.formulas.deleted
  }
})

class Formulas extends React.Component {
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
    this.newFormula = this.newFormula.bind(this)
    this.editFormula = this.editFormula.bind(this)
    this.deleteFormula = this.deleteFormula.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.formulas.formulas.map(n => n.idFormula),
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

  newFormula = (event) => {
    store.dispatch(newFormula())
    const { history } = this.props
    history.push('/formulas/new')
  }

  editFormula = (event, selected) => {
    store.dispatch(getFormula(this.props.formulas.formulas, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/formulas/' + selected,
      state: { idFormula: selected }
    })
  }

  deleteFormula = (event, selected) => {
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
    var selected = this.state.selected[0]
    var lodash = require('lodash')
      var formula = lodash.find(this.props.formulas.formulas,function(formula) {
        return formula.codigoFormula===selected
      })
    store.dispatch(deleteFormula(formula.idFormula))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = [{title:"Código",dataKey:'codigoFormula'}, {title:"Descripcion",dataKey:'descripcion'}, {title:"Formula",dataKey:'formula'}]
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('pt')
    doc.autoTable(columns, this.props.formulas.formulas,{
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {overflow: 'linebreak', columnWidth: 'wrap'},
      columnStyles: {formula: {columnWidth: 'auto'}}
  })
    doc.save('formulas.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(fetchFormulasList())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchFormulasList())
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.formulas.formulas.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <FormulasToolbar numSelected={selected.length}
          onEditClick={event => this.editFormula(event, selected)}
          onDeleteClick={event => this.deleteFormula(event, selected)}
          onAddClick={event => this.newFormula(event, selected)}
          onPdf={event => this.onPdf()}
          formulas={this.props.formulas}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.formulas.formulas}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.codigoFormula) !== -1}
                      onChange={() => this.handleClick(original.codigoFormula)}
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
                accessor: "codigoFormula",
                width: 100
              },
              {
                Header: "Descripción",
                accessor:"descripcion",
                width: 200
              },
              {
                Header: "Formula",
                accessor: "formula"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.formulas.formulas.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Formulas.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Formulas))