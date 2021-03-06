import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import axios from "axios";
import { Paper, TextField, Button } from "@material-ui/core";
import ErrorSnackbar from "../ErrorSnackbar";
import {
  countryRegion,
  E_KEY,
  PLUS_KEY,
  MINUS_KEY,
  errorMessageInput,
  errorMessageFetching,
  exchangeRateApiUrl,
  EUR_NAME,
  PLN_NAME
} from "../../config";
import "./NewTransaction.scss";

class NewTransaction extends PureComponent {
  state = {
    transactionName: "",
    amount: "",
    rate: "",
    calculatedAmount: "",
    transactionNameError: "",
    amountError: "",
    rateError: "",
    rateFetchingError: ""
  };

  calculateAmount = (amount, rate) => amount * rate;

  handleTransactionName = event => {
    this.setState({ transactionName: event.target.value });
  };

  handleChangeRate = event => {
    const { amount } = this.state;
    const rate = Number(event.target.value);
    let calculatedAmount = "";
    if (amount !== "") {
      calculatedAmount = this.calculateAmount(amount, rate);
    }
    this.setState({ rate, calculatedAmount });
  };

  handleKeyDownNumber = event => {
    const { key } = event;
    if (key === E_KEY || key === PLUS_KEY || key === MINUS_KEY) {
      event.preventDefault();
    }
  };

  handleChangeAmount = event => {
    const { rate } = this.state;
    const amount = Number(event.target.value);
    let calculatedAmount = "";
    if (rate !== "") {
      calculatedAmount = this.calculateAmount(amount, rate);
    }
    this.setState({ amount, calculatedAmount });
  };

  handleFetchRate = () => {
    axios
      .get(`${exchangeRateApiUrl}/latest?base=${EUR_NAME}&symbols=${PLN_NAME}`)
      .then(({ data }) => {
        const { rates } = data;
        const { PLN: rate } = rates;
        const { amount } = this.state;
        let calculatedAmount = "";
        if (amount !== "") {
          calculatedAmount = this.calculateAmount(amount, rate);
        }
        this.setState({ rate, calculatedAmount });
      })
      .catch(error => {
        this.setState({ rateFetchingError: errorMessageFetching });
        console.error(error);
      });
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
      stateError.transactionNameError = errorMessageInput;
      hasError = true;
    }
    if (amount === "") {
      stateError.amountError = errorMessageInput;
      hasError = true;
    }
    if (rate === "") {
      stateError.rateError = errorMessageInput;
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
        calculatedAmount: "",
        transactionNameError: "",
        amountError: "",
        rateError: "",
        rateFetchingError: ""
      });
    }
  };

  handleCloseErrorSnackBar = () => {
    this.setState({ rateFetchingError: "" });
  };

  render() {
    const {
      transactionName,
      amount,
      rate,
      calculatedAmount,
      transactionNameError,
      amountError,
      rateError,
      rateFetchingError
    } = this.state;
    return (
      <div className="new-transaction-container">
        <Paper className="new-transaction-container-paper">
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
            <div className="new-transaction-currency-rate-input-container">
              1EUR =
              <TextField
                className="new-transaction-currency-rate-input"
                onChange={this.handleChangeRate}
                onKeyDown={this.handleKeyDownNumber}
                type="number"
                margin="normal"
                value={rate}
                InputProps={{ inputProps: { min: 0 } }}
                error={rateError !== ""}
                helperText={rateError}
              />
              &nbsp;PLN
            </div>
            <Button
              className="rate-button"
              variant="outlined"
              color="primary"
              size="small"
              onClick={this.handleFetchRate}
            >
              Get current rate
            </Button>
          </div>
          <TextField
            label="Amount in Euro"
            onChange={this.handleChangeAmount}
            onKeyDown={this.handleKeyDownNumber}
            type="number"
            margin="normal"
            value={amount}
            error={amountError !== ""}
            helperText={amountError}
          />
          <div className="new-transaction-exchange-amount-container">
            Amount in PLN:
            {calculatedAmount !== ""
              ? Number(calculatedAmount).toLocaleString(countryRegion, {
                  style: "currency",
                  currency: PLN_NAME
                })
              : null}
          </div>
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
          {rateFetchingError !== "" ? (
            <ErrorSnackbar
              handleCloseError={this.handleCloseErrorSnackBar}
              error={rateFetchingError}
            />
          ) : null}
        </Paper>
      </div>
    );
  }
}

NewTransaction.propTypes = {
  addTransaction: PropTypes.func.isRequired
};

export default NewTransaction;
