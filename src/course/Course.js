import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: active => ({
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      left: 0,
      width: 5,
      height: "100%",
      backgroundColor: active ? "rgb(88, 118, 168)" : "rgba(0,0,0,0)"
    }
  })
});

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
