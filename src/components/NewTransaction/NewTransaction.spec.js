import React from "React";
import { shallow, mount } from "enzyme";
import NewTransaction from ".";
import { errorMessageInput } from "../../config";

describe("NewTransaction component", () => {
  const component = shallow(<NewTransaction addTransaction={jest.fn()} />);

  it("has working component", () => {
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });

  it("expects to call addTransaction", () => {
    const mockFunction = jest.fn();
    const componentMounted = mount(
      <NewTransaction addTransaction={mockFunction} />
    );
    componentMounted.setState({ transactionName: "Name", amount: 4, rate: 3 });
    componentMounted
      .find(".new-transaction-button")
      .first()
      .simulate("click");
    expect(mockFunction).toBeCalled();
  });

  it("expects to set an error because of the transactionName, amount and rate", () => {
    const componentMounted = mount(
      <NewTransaction addTransaction={jest.fn()} />
    );
    componentMounted.setState({ transactionName: "", amount: "", rate: "" });
    componentMounted
      .find(".new-transaction-button")
      .first()
      .simulate("click");
    expect(componentMounted.state().transactionNameError).toBe(
      errorMessageInput
    );
    expect(componentMounted.state().amountError).toBe(errorMessageInput);
    expect(componentMounted.state().rateError).toBe(errorMessageInput);
  });

  it("expects to fetch the rates", () => {
    const componentMounted = mount(
      <NewTransaction addTransaction={jest.fn()} />
    );
    componentMounted.setState({ amount: "" });
    componentMounted
      .find(".rate-button")
      .first()
      .simulate("click");

    setTimeout(() => {
      expect(componentMounted.state().rate).toBe(4.2843);
      expect(componentMounted.state().calculatedAmount).toBe("");
    }, 0);
  });

  it("expects to fetch the rates with amount", () => {
    const componentMounted = mount(
      <NewTransaction addTransaction={jest.fn()} />
    );
    componentMounted.setState({ amount: 33, rate: 12 });
    componentMounted
      .find(".rate-button")
      .first()
      .simulate("click");

    setTimeout(() => {
      expect(componentMounted.state().rate).toBe(4.2843);
      expect(componentMounted.state().calculatedAmount).toBe("396,00 zł");
    }, 0);
  });
});
