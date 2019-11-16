import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Course = ({ onClick, primary }) => (
  <ListItem button onClick={onClick}>
    <ListItemText primary={primary} />
  </ListItem>
);

export default Course;
