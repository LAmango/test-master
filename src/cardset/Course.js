import React from "react";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  list: active => ({
    position: "relative",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    },
    backgroundColor: active ? theme.palette.secondary.main : "white",
    "&:before": {
      content: "''",
      position: "absolute",
      left: 0,
      width: 5,
      height: "100%",
      backgroundColor: active ? theme.palette.primary.main : "rgba(0,0,0,0)"
    }
  })
}));

const Course = ({ onClick, primary, active }) => {
  console.log(active, primary);
  const classes = useStyles(active);
  return (
    <ListItem className={classes.list} button onClick={onClick}>
      <ListItemText primary={primary} />
    </ListItem>
  );
};

export default Course;
