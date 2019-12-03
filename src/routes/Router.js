import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Router, Redirect } from "@reach/router";
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
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import { compose } from "redux";
import { connect } from "react-redux";
import { apiActions } from "../api";

const mapStateToProps = ({ users, services }) => ({ users, services });

const actions = {
  login: apiActions.login,
  register: apiActions.register,
  update: apiActions.updateCurrentUser,
  getUsers: apiActions.fetchUsers,
  getServices: apiActions.fetchServices,
  getCards: apiActions.fetchCards
};

const enhance = compose(
  connect(
    mapStateToProps,
    actions
  )
);

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
  "@global": {
    html: {
      backgroundColor: theme.palette.primary.main
    }
  },
  routes: {
    height: "100%"
  }
}));

const Routes = ({
  getServices,
  getUsers,
  getCards,
  users,
  services,
  login,
  update,
  register
}) => {
  const classes = useStyles();
  React.useEffect(() => {
    getServices();
    getUsers();
    getCards();
  }, [getServices, getUsers, getCards]);
  return (
    <>
      <div className={classes.wrapper}>
        <Header user={users.currentUser} />
        <Router className={classes.routes}>
          <Home path="/" />
          <About path="about" />
          <Services services={services} path="service" />
          <Contact path="contact" />
          <Login
            user={users.currentUser}
            userError={users.error}
            login={login}
            path="login"
          />
          <AuthenticatedCard
            path="/card"
            user={users.currentUser}
            listStyle={classes.courseList}
          />
          <AuthenticatedAdmin
            path="/admin"
            user={users.currentUser}
            listStyle={classes.courseList}
          />
          <AuthenticatedProfile
            path="/profile"
            user={users.currentUser}
            update={update}
          />
          <Register
            path="/register"
            signUpError={users.error}
            signUp={register}
            user={users.currentUser}
          />
        </Router>
        <div className={classes.push}></div>
      </div>
      <Footer />
      <div className={classes.footer}></div>
    </>
  );
};

export default enhance(Routes);

const AuthenticatedProfile = ({ user, update }) => {
  if (!user) {
    return <Redirect to="login" noThrow />;
  } else {
    return <Profile user={user} update={update} />;
  }
};

const AuthenticatedCard = ({ user, listStyle }) => {
  if (!user) {
    return <Redirect to="/login" noThrow />;
  } else {
    return <Card listStyle={listStyle} />;
  }
};

const AuthenticatedAdmin = ({ user, listStyle }) => {
  if (!user) {
    return <Redirect to="/login" noThrow />;
  } else {
    if (user.type === "admin") {
      return <Admin />;
    } else {
      return <Card listStyle={listStyle} />;
    }
  }
};

const Card = ({ listStyle, users }) => (
  <>
    <Grid container spacing={0} justify="center">
      <Grid item className={listStyle}>
        <CourseContainer />
      </Grid>
      <Grid item>
        <CardContainer users={users} />
        <ListContainer />
      </Grid>
    </Grid>
  </>
);
