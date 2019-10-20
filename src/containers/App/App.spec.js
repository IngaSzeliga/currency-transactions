import React from "React";
import { shallow, mount } from "enzyme";
import App from ".";

describe("App component", () => {
  const component = shallow(<App />);

  it("has working component", () => {
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });

  it("expects to call deleteTransaction", () => {
    const componentMounted = mount(<App />);
    componentMounted.setState({
      transactions: [
        {
          id: "2caf5711-2913-4e41-95db-088625acf1bf",
          title: "Name",
          amount: 13,
          convertedAmount: 54.99
        }
      ]
    });
    componentMounted
      .instance()
      .deleteTransaction("2caf5711-2913-4e41-95db-088625acf1bf");
    expect(componentMounted.state("transactions")).toEqual([]);
  });

  it("expects to call addTransaction", () => {
    const componentMounted = mount(<App />);
    const transaction = {
      id: "2caf5711-2913-4e41-95db-088625acf1bf",
      title: "Name",
      amount: 13,
      convertedAmount: 54.99
    };
    componentMounted.instance().addTransaction(transaction);
    expect(componentMounted.state("transactions")).toEqual([transaction]);
  });
});
