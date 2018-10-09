import React from 'react'
import Button from '@material-ui/core/Button'
import  {Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import {Input, InputLabel } from '@material-ui/core'
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import store from '../../../store/store'
import { connect } from 'react-redux'
import FormDialog from './FormDialog.jsx'

const styles = theme => ({
    root: {
        background:'#FF7043'
    },
    button: {
        margin: theme.spacing.unit
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    FormHelperText: {
        color: 'red'
    },
    formControl: {
        marginTop: '1em'
    },
    select: {
        width: '19vw',
        marginTop: '1em'
    },
    field: {
        width: '19vw'
    }
})

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
@connect((store) => {
  return {
  }
})

class ComponentDialog extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        open: false,
        openDialog: false,
      }
      this.openDialog = this.openDialog.bind(this)
      this.closeDialog = this.closeDialog.bind(this)
      this.aceptDialog = this.aceptDialog.bind(this)
  }

    openDialog(){
        this.setState({ open: true })
    }

    closeDialog = () => {
        this.setState({ open: false })
    }
    
    aceptDialog = () => {
        this.props.dispatch
        this.closeDialog()
    }
  render() {
    const classes = this.props.classes
    return (
      <div>
        <FormControl className={classes.formControl}>
            <TextField className={classes.field}
                id={this.props.idDialog}
                label={this.props.labelDialog}
                value={this.props.valueTextField}
                onChange={this.handleValueChange}
                onClick={this.openDialog}
            />
            <Dialog
                open={this.state.open}
                onClose={this.closeDialog}
                style={{overflowY: 'hidden'}}
            >
                <DialogTitle id="alert-dialog-title">{this.props.titleDialog}</DialogTitle>
                <DialogContent 
                className={classes.dialog}>
                    <FormDialog
                        titleDialog={this.props.titleDialog}
                        dataList={this.props.dataList}
                        idComponent={this.props.idDialog}
                        setData={this.props.setData}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.closeDialog} color="primary">
                    Cancelar
                </Button>
                <Button onClick={this.aceptDialog} color="primary" autoFocus>
                    Aceptar
                </Button>
                </DialogActions>
            </Dialog>
        </FormControl>
      </div>
    )
  }
}

ComponentDialog.propTypes = {
    setData: PropTypes.func,
    labelDialog: PropTypes.string,
    idDialog: PropTypes.string,
    titleDialog: PropTypes.string,
    valueTextField: PropTypes.string,
    dataList:PropTypes.object,
    dispatch:PropTypes.func
  }

export default withStyles(styles)(ComponentDialog)