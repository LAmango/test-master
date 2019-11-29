import React from "react";
import Header from "../common/Header";
import { Router } from "@reach/router";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CardContainer from "../card/CardContainer";
import ListContainer from "../list/ListContainer";
import CourseContainer from "../cardset/CourseContainer";
import Home from "../pages/Home";
import Services from "../pages/Services";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import AdminLogin from "../pages/AdminLogin";

const useStyles = makeStyles(theme => ({
  courseList: {
    height: "100%",
    marginRight: 20
  },
  wrapper: {
    minHeight: "100%",
    marginBottom: -50,
    backgroundColor: "white"
  },
  push: {
    height: 50
  },
  footer: {
    height: 50,
    backgroundColor: theme.palette.primary.main
  },
  "@global": {
    html: {
      backgroundColor: theme.palette.primary.main
    }
  },
  routes: {
    height: "100%"
  }
}));

const Routes = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.wrapper}>
        <Header />
        <Router className={classes.routes}>
          <Home path="/" />
          <About path="about" />
          <Services path="services" />
          <Contact path="contact" />
          <Card listStyle={classes.courseList} path="card" />
          <Admin path="admin" />
          <AdminLogin path="admin/login" />
        </Router>
        <div className={classes.push}></div>
      </div>
      <div className={classes.footer}></div>
    </>
  );
};

export default Routes;

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
