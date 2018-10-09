import React from 'react'
import Button from '@material-ui/core/Button'
import  {Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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
    }
})

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
class NoDeleteDialog extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        open: true,
      }
  }

  render() {
    const classes = this.props.classes
    return (
      <div>
        <Dialog
          open={this.props.openNoDelete}
          onClose={this.props.aceptNoDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                No se pueden eliminar items del tipo "Clase"
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.aceptNoDelete} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

NoDeleteDialog.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    aceptDialog: PropTypes.func.isRequired
  }

export default withStyles(styles)(NoDeleteDialog)