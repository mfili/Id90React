import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select'
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField'


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 200,
    width: 200,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  MuiPickersToolbar: {
    backgroundColor: '#ff0000'
  }
});

class XpayPage extends React.Component {
  state = {
    selectedDate: new Date(),

  }

  
  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;
    const { classes } = this.props;
    return (
      <div>
      <div >
          <DatePicker
            label="Basic example"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
          <DatePicker style={{
              width: '19vw',
              marginTop: '1em'}}
          keyboard
          label="Fecha de Alta"
          onError={console.log}
          value={selectedDate}
          onChange={this.handleDateChange}
          format="YYYY-MM-DD"
          />
        </div>

        <div className="picker">
          <DatePicker
            autoOk
            label="Clearable"
            clearable
            disableFuture
            maxDateMessage="Date must be less than today"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>

        <div className="picker">
          <DatePicker
            label="With today button"
            showTodayButton
            maxDateMessage="Date must be less than today"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>
        </div>
    );
  }
}

XpayPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(XpayPage))