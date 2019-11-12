import React from "react";
import CardContainer from "../card/CardContainer";
import ListContainer from "../list/ListContainer";
import { Provider } from "react-redux";
import storeConfig from "../store";
import Header from "../common/Header";
import { Router } from "@reach/router";

let initialState = {};
const persistedState = localStorage.getItem("reduxState");
if (persistedState) {
  initialState = JSON.parse(persistedState);
}

const store = storeConfig(initialState);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <Router>
          <Home path="/" />
          <Card path="card" />
          <About path="about" />
        </Router>
      </Provider>
    </div>
  );
}

export default App;

let Home = () => <div>Home</div>;
let About = () => <div>About</div>;

const Card = () => (
  <>
    <CardContainer />
    <ListContainer />
  </>
);
