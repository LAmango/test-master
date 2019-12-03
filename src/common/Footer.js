import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  footer: {
    height: 50,
    backgroundColor: theme.palette.primary.main
  },
  group: {
    display: "inline-flex",
    color: "white",
    padding: 20,
    textAlign: "center"
  },
  grid: {
    height: "inherit"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        className={classes.grid}
        justify="space-evenly"
      >
        <Grid item xs>
          <div className={classes.group}>
            <div>Location: </div>
            <span>1234 Monroe St. Tallahsee, FL 32312</span>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.group}>
            <div>Number: </div>
            <span>555-5555</span>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.group}>
            <div>Email: </div>
            <span>lucas@albano.us</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
