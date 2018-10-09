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
import SocialWorkToolbar from './SocialWorkToolbar.jsx'
import store from '../../../store/store'
import { connect } from 'react-redux'
import { fetchSocialWorkList, deleteSocialWork } from '../../../store/actions/socialWork/socialWorksActions'
import { getSocialWork, newSocialWork } from '../../../store/actions/socialWork/socialWorkActions'
import { fetchPlanSocialWorkList } from '../../../store/actions/socialWork/socialWorkPlan/socialWorkPlansActions'
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
    obrasSociales: store.obrasSociales,
    deleted: store.obrasSociales.deleted
  }
})

class SocialWork extends React.Component {
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
    this.newSocialWork = this.newSocialWork.bind(this)
    this.editSocialWork = this.editSocialWork.bind(this)
    this.deleteSocialWork = this.deleteSocialWork.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.obrasSociales.obrasSociales.map(n => n.codigoObraSocial),
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

  newSocialWork = (event) => {
    store.dispatch(newSocialWork())
    const { history } = this.props
    history.push('/obraSocial/new')
  }

  editSocialWork = (event, selected) => {
    store.dispatch(getSocialWork(this.props.obrasSociales.obrasSociales, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/obraSocial/' + selected,
      state: { codigoObraSocial: selected }
    })
  }
  
  listSocialWorkPlan = (event, selected) => {
    store.dispatch(getSocialWork(this.props.obrasSociales.obrasSociales, selected[0]))
    const { history } = this.props
    history.push({
      pathname: 'planObraSocial',
      state: { idObraSocial: selected }
    })
  }

  deleteSocialWork = (event, selected) => {
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
    store.dispatch(deleteSocialWork(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Número Período", "Estado", "Descripción", "Día Inicial", "Duración Días"]
    var rows = []

    for (var i = 0; i < this.props.obrasSociales.obrasSociales.length; i++) {
      rows.push([this.props.obrasSociales.obrasSociales[i].codigoObraSocial,
                  this.props.obrasSociales.obrasSociales[i].descripcion])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows,{
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {columnWidth: 'wrap'}
  })
    doc.save('obrasSociales.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(newSocialWork())
    store.dispatch(fetchSocialWorkList())
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchSocialWorkList())
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.obrasSociales.obrasSociales.length - page * rowsPerPage)
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <SocialWorkToolbar numSelected={selected.length}
          onEditClick={event => this.editSocialWork(event, selected)}
          listSocialWorkPlan={event => this.listSocialWorkPlan(event, selected)}
          onDeleteClick={event => this.deleteSocialWork(event, selected)}
          onAddClick={event => this.newSocialWork(event, selected)}
          onPdf={event => this.onPdf()}
          obrasSociales={this.props.obrasSociales}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.obrasSociales.obrasSociales}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.codigoObraSocial) !== -1}
                      onChange={() => this.handleClick(original.codigoObraSocial)}
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
                accessor: "codigoObraSocial"
              },
              {
                Header: "Descripción",
                accessor: "descripcion"
              },
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.obrasSociales.obrasSociales.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

SocialWork.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(SocialWork))