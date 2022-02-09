import React from "react";
import { render } from "@testing-library/react";
import DeliveryItem from "../DeliveryItem";
import { Provider } from "react-redux";
import store, { createReduxStore, RootState } from "../../../store/store";
import { deliveriesMock } from "../../../utils/constants";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ deliveryId: "1" })),
}));
const reactRouterDom = require("react-router-dom");

describe("<DeliveryItem />", () => {
  test("renders correctly", () => {
    reactRouterDom.useParams.mockImplementation(() => ({ deliveryId: "1" }));
    const wrapper = render(
      <reactRouterDom.BrowserRouter>
        <Provider store={store}>
          <DeliveryItem />
        </Provider>
      </reactRouterDom.BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("should be unavailable to make active if active delivery is in store", () => {
    reactRouterDom.useParams.mockImplementation(() => ({ deliveryId: "1" }));
    const customState: RootState = {
      deliveries: {
        deliveries: deliveriesMock,
        activeDeliveryId: "2",
      },
    };
    const customStore = createReduxStore(customState);
    const { getByTitle } = render(
      <reactRouterDom.BrowserRouter>
        <Provider store={customStore}>
          <DeliveryItem />
        </Provider>
      </reactRouterDom.BrowserRouter>
    );
    const makeActiveButton = getByTitle(
      "You can't have 2 active deliveries at the same time"
    );
    expect(makeActiveButton.disabled).toBeTruthy();
  });

  test("should have 2 buttons if it's active delivery", () => {
    reactRouterDom.useParams.mockImplementation(() => ({ deliveryId: "2" }));
    const customState: RootState = {
      deliveries: {
        deliveries: deliveriesMock,
        activeDeliveryId: "2",
      },
    };
    const customStore = createReduxStore(customState);
    const { getByText } = render(
      <reactRouterDom.BrowserRouter>
        <Provider store={customStore}>
          <DeliveryItem />
        </Provider>
      </reactRouterDom.BrowserRouter>
    );
    const deliveredButton = getByText("Delivered");
    const undeliveredButton = getByText("Undelivered");
    expect(deliveredButton.tagName).toBe("BUTTON");
    expect(undeliveredButton.tagName).toBe("BUTTON");
  });
});
