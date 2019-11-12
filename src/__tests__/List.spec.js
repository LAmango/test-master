import React from "react";
import { create } from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import List from "../list/List";
import { initialState as card } from "../card/ducks";

const mockStore = configureStore([]);

describe("rendering", () => {
  let store;
  let list;
  beforeEach(() => {
    store = mockStore({ card: card });

    store.dispatch = jest.fn();

    list = create(
      <Provider store={store}>
        <List />
      </Provider>
    );
  });

  it("should render a <List />", () => {
    expect(list.toJSON()).toMatchSnapshot();
  });
  it("should render two inputs", () => {});
  it("should render a container for actions", () => {});
  it("should render 3 action buttons", () => {});
});

describe("interactions", () => {
  it("clicking the swapitems action shoudl swap items on the inputs", () => {});
});
