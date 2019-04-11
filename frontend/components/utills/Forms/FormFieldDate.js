import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FormGroup, Label, Button } from "reactstrap";
import { FormFiledsStyles } from "./FormFiled";
import "react-datepicker/dist/react-datepicker.css";

class DateField extends React.Component {
  constructor(props) {
    super(props);
    const dateValue = props.date ? moment(props.date) : moment();

    this.state = {
      dateValue,
      DisableEndDate: false
    };
  }
  SetFiedsValueAndTouched = (date, touched) => {
    // in order to set onChange handler for input(date inputs) fields in portfolioForm we need to get some props from formik and set values
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;
    setFieldValue(name, date, true);
    setFieldTouched(name, touched, true);
  };

  toggleDate = date => {
    this.setState({
      DisableEndDate: !this.state.DisableEndDate
    });
    this.SetFiedsValueAndTouched(date, true);
  };

  handleChange = date => {
    this.setState({
      dateValue: date
    });
    this.SetFiedsValueAndTouched(date, true);
  };

  render() {
    const { touched, errors } = this.props.form;
    const { canBeDisabled } = this.props;
    return (
      <>
        <FormGroup>
          <Label>
            {this.props.label}
            <div className="input-group">
              <FormFiledsStyles>
                {!this.state.DisableEndDate && (
                  <DatePicker
                    selected={this.state.dateValue}
                    onChange={this.handleChange}
                    maxDate={moment()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="DD/MM/YYYY"
                    dateFormatCalendar="MMMM"
                  />
                )}

                {touched[this.props.field.name] &&
                  errors[this.props.field.name] && (
                    <div className="error custum__error">
                      {errors[this.props.field.name]}
                    </div>
                  )}
              </FormFiledsStyles>
            </div>
          </Label>
          {canBeDisabled && !this.state.DisableEndDate && (
            <Button
              onClick={() => {
                this.toggleDate();
              }}
            >
              Still Working here
            </Button>
          )}
          {canBeDisabled && this.state.DisableEndDate && (
            <>
              <div>Still Working There</div>
              <Button
                onClick={() => {
                  this.toggleDate(this.state.dateValue);
                }}
              >
                Set End Date
              </Button>
            </>
          )}
        </FormGroup>
      </>
    );
  }
}

export default DateField;
