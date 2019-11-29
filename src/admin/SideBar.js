import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  container: {
    height: "100%"
  },
  title: {
    color: theme.palette.primary.main
  },
  list: {
    position: "relative",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    },
    backgroundColor: theme.palette.secondary.main,
    "&:before": {
      content: "''",
      position: "absolute",
      left: 0,
      width: 5,
      height: "100%",
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const SideBar = ({ cardsets, handleSelect }) => {
  const classes = useStyles();
  const [selected, setSelect] = React.useState(null);

  const handleClick = (collection, cardset = null) => {
    if (cardset) {
      setSelect(cardset);
      handleSelect("cardsets", cardset);
    } else {
      setSelect(collection);
      handleSelect(collection);
    }
  };

  const cardsetList = cardsets
    ? cardsets.map(cardset => {
        return (
          <ListItem
            key={cardset._id}
            button
            classes={{
              selected: classes.list
            }}
            selected={selected === cardset.name}
            onClick={() => handleClick("cardsets", cardset.name)}
          >
            <ListItemText primary={cardset.name} />
          </ListItem>
        );
      })
    : null;

  return (
    <Grid className={classes.root} item xs={3}>
      <div className={classes.container}>
        <h2 className={classes.title}>Collections</h2>
        <List component="nav" subheader={<li />}>
          <ListItem
            button
            classes={{
              selected: classes.list
            }}
            onClick={() => handleClick("users")}
            selected={selected === "users"}
          >
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            button
            classes={{
              selected: classes.list
            }}
            onClick={() => handleClick("services")}
            selected={selected === "services"}
          >
            <ListItemText primary="Services" />
          </ListItem>
          <ListSubheader>Cardsets</ListSubheader>
          {cardsetList}
        </List>
      </div>
    </Grid>
  );
};

export default SideBar;
