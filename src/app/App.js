import React from "react";
import CardContainer from "../card/CardContainer";
import ListContainer from "../list/ListContainer";
import { Provider } from "react-redux";
import storeConfig from "../store";
import Header from "../common/Header";

const store = storeConfig();

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <CardContainer />
        <ListContainer />
      </Provider>
    </div>
  );
}

export default App;
