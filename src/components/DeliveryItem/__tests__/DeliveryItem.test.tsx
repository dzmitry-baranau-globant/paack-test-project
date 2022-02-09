import React from "react";
import { render } from "@testing-library/react";
import DeliveryItem from "../DeliveryItem";

describe("<DeliveryItem />", () => {
  it("renders correctly", () => {
    const wrapper = render(<DeliveryItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
