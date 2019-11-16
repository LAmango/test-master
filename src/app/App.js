import React from "react";
import { Grid } from "@material-ui/core";
import CardContainer from "../card/CardContainer";
import ListContainer from "../list/ListContainer";
import CourseContainer from "../course/CourseContainer";
import { Provider } from "react-redux";
import storeConfig from "../store";
import Header from "../common/Header";
import { Router } from "@reach/router";

let initialState = {};
const persistedState = localStorage.getItem("reduxState");
if (persistedState) {
  initialState = JSON.parse(persistedState);
}

const store = storeConfig();

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
    <Grid container spacing={0} justify="center">
      <Grid item>
        <CourseContainer />
      </Grid>
      <Grid item>
        <CardContainer />
        <ListContainer />
      </Grid>
    </Grid>
  </>
);
