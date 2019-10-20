import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import { Paper, TextField, Button } from "@material-ui/core";
import { E_KEYCODE, errorMessage } from "../../config";
import "./NewTransaction.scss";

class NewTransaction extends PureComponent {
  state = {
    transactionName: "",
    amount: "",
    rate: "",
    calculatedAmount: "",
    transactionNameError: "",
    amountError: "",
    rateError: ""
  };

  calculateAmount = (amount, rate) => amount * rate;

  handleTransactionName = event => {
    this.setState({ transactionName: event.target.value });
  };

  handleChangeRate = event => {
    const { amount } = this.state;
    const rate = Number(event.target.value);
    const calculatedAmount = this.calculateAmount(amount, rate);
    this.setState({ rate, calculatedAmount });
  };

  handleKeyDownRate = event => {
    if (event.keyCode === E_KEYCODE) {
      event.preventDefault();
    }
  };

  handleChangeAmount = event => {
    const { rate } = this.state;
    const amount = Number(event.target.value);
    const calculatedAmount = this.calculateAmount(amount, rate);
    this.setState({ amount, calculatedAmount });
  };

  handleSubmit = () => {
    const { transactionName, amount, calculatedAmount, rate } = this.state;
    const stateError = {
      transactionNameError: "",
      amountError: "",
      rateError: ""
    };
    let hasError = false;
    if (transactionName === "") {
      stateError.transactionNameError = errorMessage;
      hasError = true;
    }
    if (amount === "") {
      stateError.amountError = errorMessage;
      hasError = true;
    }
    if (rate === "") {
      stateError.rateError = errorMessage;
      hasError = true;
    }
    if (hasError) {
      this.setState(stateError);
    } else {
      const { addTransaction } = this.props;
      addTransaction({
        id: uuidv4(),
        title: transactionName,
        amount: amount,
        convertedAmount: calculatedAmount
      });
      this.setState({
        transactionName: "",
        amount: "",
        rate: "",
        calculatedAmount: ""
      });
    }
  };

  render() {
    const { transactionName, amount, rate, calculatedAmount } = this.state;
    const { transactionNameError, amountError, rateError } = this.state;
    return (
      <Paper className="new-transaction-container">
        <TextField
          label="Transaction Name"
          onChange={this.handleTransactionName}
          type="text"
          margin="normal"
          value={transactionName}
          error={transactionNameError !== ""}
          helperText={transactionNameError}
        />
        <div className="new-transaction-currency-rate">
          1EUR =
          <TextField
            className="new-transaction-currency-rate-input"
            onChange={this.handleChangeRate}
            onKeyDown={this.handleKeyDownRate}
            type="number"
            margin="normal"
            value={rate}
            InputProps={{ inputProps: { min: 0 } }}
            error={rateError !== ""}
            helperText={rateError}
          />
          PLN
        </div>
        <TextField
          label="Amount in Euro"
          onChange={this.handleChangeAmount}
          type="number"
          margin="normal"
          value={amount}
          error={amountError !== ""}
          helperText={amountError}
        />
        <div>Amount in PLN: {calculatedAmount}</div>
        <div className="new-transaction-button-container">
          <Button
            className="new-transaction-button"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Paper>
    );
  }
}

NewTransaction.propTypes = {
  addTransaction: PropTypes.func.isRequired
};

export default NewTransaction;
