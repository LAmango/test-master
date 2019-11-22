import React from "react";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteOutlinedIcon from "@material-ui/icons/Delete";

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
  }),
  button: active => ({
    "& button": {
      display: active ? "block" : "none",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: "rgba(0,0,0,0)"
      }
    }
  })
}));

const Course = ({ deleteCardset, onClick, primary, active }) => {
  const classes = useStyles(active);
  return (
    <ListItem className={classes.list} button onClick={onClick}>
      <ListItemText primary={primary} />
      <ListItemSecondaryAction className={classes.button}>
        <IconButton edge="end" aria-label="delete" onClick={deleteCardset}>
          <DeleteOutlinedIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Course;
