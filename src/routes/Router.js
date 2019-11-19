import React from "react";
import Header from "../common/Header";
import { Router } from "@reach/router";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContainer from "../card/CardContainer";
import ListContainer from "../list/ListContainer";
import CourseContainer from "../cardset/CourseContainer";

const useStyles = makeStyles({
  courseList: {
    height: "100%",
    marginRight: 20
  }
});

const Routes = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Router>
        <Home path="/" />
        <Card listStyle={classes.courseList} path="card" />
        <About path="about" />
      </Router>
    </>
  );
};

export default Routes;

let Home = () => <div>Home</div>;
let About = () => <div>About</div>;

const Card = ({ listStyle }) => (
  <>
    <Grid container spacing={0} justify="center">
      <Grid item className={listStyle}>
        <CourseContainer />
      </Grid>
      <Grid item>
        <CardContainer />
        <ListContainer />
      </Grid>
    </Grid>
  </>
);
