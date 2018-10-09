import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import  {Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux'
import store from '../../../../store/store'
import ReactTable from "react-table"
import "react-table/react-table.css"
import { saveItem } from '../../../../store/actions/class/items/itemActions'
import { fetchConceptTypesList } from '../../../../store/actions/concepts/conceptTypesActions'

let counter = 0;
function createData(idComponent, descripcion) {
  counter += 1;
  return { id: counter, idComponent, descripcion };
}

const columnData = [
  { id: 'codigoConcepto', numeric: false, disablePadding: true, label: 'Código' },
  { id: 'descripcionConceptos', numeric: true, disablePadding: false, label: 'Descripción' }
];


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let ComponentItemsToolbar = props => {
  const { numSelected, classes, labelDialog } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">{labelDialog}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

ComponentItemsToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  labelDialog: PropTypes.string
};

ComponentItemsToolbar = withStyles(toolbarStyles)(ComponentItemsToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


@connect((store) => {
  return {
      conceptos: store.concepts.conceptos,
      tipos: store.conceptTypes.conceptTypes
  }
})

class ComponentItems extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'codigo',
      page: 0,
      rowsPerPage: 5,
      openDialog: false,
      selected: [], 
      selectAll: 0,
      anchorEl: null
    };
  }
  toggleSelectAll() {
		if (this.state.selectAll === 0) {
      this.setState({ 
        selected: this.props.conceptos.map(n => n.idConcepto),
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
    store.dispatch(saveItem(newSelected[0]))
  }

  handleChangeRowsPerPage = size => {
    this.setState({ rowsPerPage: size})
  }
  
  createTypeConceptMenuItem() {
    var items = []
    if (this.props.tipos) {
        for (var i = 0; i < this.props.tipos.length; i++) {
            items.push(
                <option value={this.props.tipos[i].descripcion}>{this.props.tipos[i].descripcion}</option>
            )
        }
    }
    return items
}

componentDidMount() {
  store.dispatch(fetchConceptTypesList())
}

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.conceptos.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
      <ReactTable
            data={this.props.conceptos}
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
                accessor: "codigoConcepto",
                filterMethod: (filter, row) =>
                  row[filter.id].startsWith(filter.value) 
              },
              {
                Header: "Descripción",
                accessor:"descripcionConcepto",
                filterMethod: (filter, row) =>
                  row[filter.id].startsWith(filter.value) 
              },
              {
                Header: "Tipo Concepto",
                accessor:"tipoConcepto.descripcion",
                filterMethod: (filter, row) => {
                  if (filter.value === "0") {
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
                    {this.createTypeConceptMenuItem()}
                  </select>
              }
            ]}
            defaultPageSize={this.state.rowsPerPage}
            className="-striped -highlight"
            loading={this.props.conceptos.length===0}
            onPageSizeChange={(pageSize, pageIndex) => {this.handleChangeRowsPerPage(pageSize)}}
          />
        </div>
      </Paper>
    );
  }
}

ComponentItems.propTypes = {
  classes: PropTypes.object.isRequired,
  setData: PropTypes.func,
}

export default withStyles(styles)(ComponentItems);