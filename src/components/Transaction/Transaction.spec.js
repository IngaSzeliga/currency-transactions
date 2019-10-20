import React from "React";
import { shallow, mount } from "enzyme";
import { Fab } from "@material-ui/core";
import Transaction from ".";

describe("Transaction component", () => {
  const component = shallow(
    <Transaction
      id="some-id"
      title="some-title"
      amount={12}
      convertedAmount="12,33"
      deleteTransaction={jest.fn()}
    />
  );

  it("has working component", () => {
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });

  it("expects to call deleteTransaction", () => {
    const mockFunction = jest.fn();
    const componentMounted = mount(
      <Transaction
        id="some-id"
        title="some-title"
        amount={12}
        convertedAmount="12,33"
        deleteTransaction={mockFunction}
      />
    );
    componentMounted
      .find(Fab)
      .first()
      .simulate("click");
    expect(mockFunction).toBeCalled();
  });
});
