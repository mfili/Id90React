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
import SocialWorkPlanToolbar from './SocialWorkPlanToolbar.jsx'
import store from '../../../../store/store'
import { connect } from 'react-redux'
import { fetchPlanSocialWorkList, deleteSocialWorkPlan } from '../../../../store/actions/socialWork/socialWorkPlan/socialWorkPlansActions'
import { getSocialWorkPlan, newSocialWorkPlan } from '../../../../store/actions/socialWork/socialWorkPlan/socialWorkPlanActions'
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
    planesObraSocial: store.planesObraSocial,
    codigoObraSocial: store.obraSocial.codigoObraSocial,
    deleted: store.planesObraSocial.deleted
  }
})

class SocialWorkPlan extends React.Component {
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
    this.newSocialWorkPlan = this.newSocialWorkPlan.bind(this)
    this.editSocialWorkPlan = this.editSocialWorkPlan.bind(this)
    this.deleteSocialWorkPlan = this.deleteSocialWorkPlan.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.aceptDialog = this.aceptDialog.bind(this)

  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.planesObraSocial.planesObraSocial.map(n => n.codigoPlanObraSocial),
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
  newSocialWorkPlan = (event) => {
    store.dispatch(newSocialWorkPlan())
    const { history } = this.props
    history.push('/planObraSocial/new')
  }

  editSocialWorkPlan = (event, selected) => {
    store.dispatch(getSocialWorkPlan(this.props.planesObraSocial.planesObraSocial, selected[0]))
    const { history } = this.props
    history.push({
      pathname: '/planObraSocial/' + selected,
      state: { idPlanObraSocial: selected }
    })
  }

  deleteSocialWorkPlan = (event, selected) => {
    this.setState({
      openDialog: true
    })
  }

  closeDialog = (event, selected) => {
    this.setState({
      openDialog: false
    })
  }

  returnObraSocial = () => {
    const { history } = this.props
    history.push('/obraSocial')
  }

  aceptDialog = (event) => {
    store.dispatch(deleteSocialWorkPlan(this.state.selected[0]))
    this.closeDialog()
  }
  
  onPdf = (event) => {
    var columns = ["Código", "Descripción"]
    var rows = []

    for (var i = 0; i < this.props.planesObraSocial.planesObraSocial.length; i++) {
      rows.push([this.props.planesObraSocial.planesObraSocial[i].codigoPlanObraSocial,
                  this.props.planesObraSocial.planesObraSocial[i].descripcion])
    }
    
    var jsPDF = require('jspdf')
    require('jspdf-autotable')
    var doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, rows,{
      margin: {horizontal: 7},
      bodyStyles: {valign: 'top'},
      styles: {columnWidth: 'wrap'}
  })
    doc.save('planObraSocial.pdf')
    this.handleExportClose()
  }

  
  handleExportClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleExportClose = () => {
    this.setState({ anchorEl: null })
  }

  componentDidMount() {
    store.dispatch(newSocialWorkPlan())
      store.dispatch(fetchPlanSocialWorkList(this.props.codigoObraSocial))
  }
  render() {
    if(this.props.deleted == true){
      store.dispatch(fetchPlanSocialWorkList(this.props.codigoObraSocial))
    }
    const { numSelected, classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.planesObraSocial.planesObraSocial.length - page * rowsPerPage)
    
    
    return (
      <Paper className={classes.root}>
        <DeleteDialog className={classes.dialog} openDialog={this.state.openDialog} closeDialog={this.closeDialog} aceptDialog={this.aceptDialog} />
        <SocialWorkPlanToolbar numSelected={selected.length}
          onEditClick={event => this.editSocialWorkPlan(event, selected)}
          onDeleteClick={event => this.deleteSocialWorkPlan(event, selected)}
          onAddClick={event => this.newSocialWorkPlan(event, selected)}
          onReturnObraSocial={event => this.returnObraSocial(event, selected)}
          onPdf={event => this.onPdf()}
          planesObraSocial={this.props.planesObraSocial}
          handleExportClick={this.handleExportClick}
          handleExportClose={this.handleExportClose}
          anchorEl={this.state.anchorEl}
        />
        <div className={classes.tableWrapper}>
          <ReactTable
            data={this.props.planesObraSocial.planesObraSocial}
            columns={[
              {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected.indexOf(original.codigoPlanObraSocial) !== -1}
                      onChange={() => this.handleClick(original.codigoPlanObraSocial)}
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
                Header: "Codigo Plan",
                accessor: "codigoPlanObraSocial"
              },
              {
                Header: "Descripcion",
                accessor:"descripcion"
              },
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.planesObraSocial.planesObraSocial.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    )
  }
}

SocialWorkPlan.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(SocialWorkPlan))