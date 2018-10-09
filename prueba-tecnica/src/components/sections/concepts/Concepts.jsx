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
import ConceptosToolbar from './ConceptsToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchConceptsList, deleteConcept } from '../../../store/actions/concepts/conceptsActions'
import { getConcept, newConcept } from '../../../store/actions/concepts/conceptActions'
import { clearAccumulators } from '../../../store/actions/concepts/accumulatorsActions'
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
    conceptos: store.concepts,
    deleted: store.concepts.deleted,
    company: store.login.companyId
  }
})

class Concepts extends React.Component {
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
    this.newConcept = this.newConcept.bind(this)
    this.editConcept = this.editConcept.bind(this)
    this.deleteConcept = this.deleteConcept.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.conceptos.conceptos.map(n => n.idConcepto),
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

  newConcept = (event) => {
    store.dispatch(newConcept(this.props.company))
    const { history } = this.props
    history.push('/concepto/new')
  }

  editConcept = (event, selected) => {
    store.dispatch(getConcept(this.props.conceptos.conceptos, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/concepto/' + selected,
      state: { idConcepto: selected }
    })
  }

  deleteConcept = (event, selected) => {
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
    store.dispatch(deleteConcept(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Código", "Descripcion", "Tipo", "Orden"]
    var rows = []

    for (var i = 0; i < this.props.conceptos.conceptos.length; i++) {
      rows.push([this.props.conceptos.conceptos[i].codigoConcepto,
                  this.props.conceptos.conceptos[i].descripcionConcepto,
                  this.props.conceptos.conceptos[i].tipoConcepto?this.props.conceptos.conceptos[i].tipoConcepto.descripcion:'',
                  this.props.conceptos.conceptos[i].numeroOrden])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows)
    doc.save('conceptos.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(fetchConceptsList(this.props.company))
    store.dispatch(clearAccumulators())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchConceptsList(this.props.company))
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.conceptos.conceptos.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <ConceptosToolbar numSelected={selected.length}
          onEditClick={event => this.editConcept(event, selected)}
          onDeleteClick={event => this.deleteConcept(event, selected)}
          onAddClick={event => this.newConcept(event, selected)}
          onPdf={event => this.onPdf()}
          concepts={this.props.conceptos}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.conceptos.conceptos}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.idConcepto) !== -1}
                      onChange={() => this.handleClick(original.idConcepto)}
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
                accessor: "codigoConcepto"
              },
              {
                Header: "Descripción",
                accessor:"descripcionConcepto"
              },
              {
                Header: "Tipo",
                id: "type",
                accessor: d => d.tipoConcepto !== null ? d.tipoConcepto.descripcion : ""
              },
              {
                Header: "Orden",
                accessor: "numeroOrden"
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.conceptos.conceptos.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

Concepts.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Concepts))