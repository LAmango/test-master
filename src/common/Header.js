import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "@reach/router";
import Logo from "../assets/logo.svg";

const userStyles = makeStyles(theme => ({
  headerContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "100%"
  },
  logo: {
    float: "left",
    fontSize: 25,
    color: theme.palette.secondary.main
  },
  headerLayout: {
    display: "flex",
    padding: "10px 0",
    margin: "auto",
    width: "80%"
  },
  title: {
    width: "40%",
    margin: "auto",
    height: "100%"
  },
  navigation: {
    display: "flex",
    justifyContent: "flex-end",
    width: "60%",
    "&> a": {
      textDecoration: "none"
    }
  },
  navItem: {
    color: theme.palette.secondary.main,
    padding: "10px 15px",
    margin: "0 10px",
    border: `2px ${theme.palette.secondary.main} solid`,
    borderRadius: 4
  }
}));

const Header = props => {
  const classes = userStyles();
  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerLayout}>
        <div className={classes.title}>
          <div className={classes.logo}>
            <img src={Logo} alt="Test Master Logo" />
          </div>
        </div>
        <div className={classes.navigation}>
          <Link to="/">
            <div className={classes.navItem}>Home</div>
          </Link>
          <Link to="services">
            <div className={classes.navItem}>Services</div>
          </Link>
          <Link to="about">
            <div className={classes.navItem}>About</div>
          </Link>
          <Link to="contact">
            <div className={classes.navItem}>Contact</div>
          </Link>
          {props.user ? (
            <Link to="profile">
              <div className={classes.navItem}>Profile</div>
            </Link>
          ) : (
            <Link to="card">
              <div className={classes.navItem}>Login</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
