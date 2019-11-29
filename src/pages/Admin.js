import React from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Collections from "../admin/Collection";
import SideBar from "../admin/SideBar";

const styles = theme => ({
  root: {
    height: "100%"
  }
});

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsets: null,
      users: null,
      services: null,
      chosenCollection: null,
      collectionName: null,
      chosenSerializer: null,
      chosenCardset: null,
      url: "http://localhost:4000/"
    };
  }

  componentDidMount() {
    fetch(this.state.url + "cardsets")
      .then(res => res.json())
      .then(cardsets =>
        this.setState({
          cardsets: cardsets
        })
      );

    fetch(this.state.url + "services")
      .then(res => res.json())
      .then(services =>
        this.setState({
          services: services
        })
      );
  }
  handleSelect = (collection, cardsetName = null) => {
    console.log(collection);
    let serializer, chosenCollection;
    switch (collection) {
      case "services":
        serializer = ["_id", "title", "description"];
        chosenCollection = this.state.services;
        break;
      case "users":
        serializer = ["_id", "email", "school"];
        chosenCollection = this.state.users;
        break;
      case "cardsets":
        serializer = ["_id", "front", "back"];
        console.log(this.state.cardsets, cardsetName);
        chosenCollection = this.state.cardsets.filter(
          cardset => cardset.name === cardsetName
        )[0].cards;
        break;
      default:
        break;
    }
    this.setState({
      chosenCollection: chosenCollection,
      collectionName: collection,
      chosenSerializer: serializer,
      chosenCardset: cardsetName
    });
  };

  handleAdd = (collection, title, cardset = null) => {
    if (cardset) {
      //do stuff
    } else {
      fetch(this.state.url + "services", {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "post"
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={0}>
        <SideBar
          cardsets={this.state.cardsets}
          handleSelect={this.handleSelect}
        />
        <Collections
          chosen={this.state.chosenCollection}
          title={this.state.collectionName}
          serializer={this.state.chosenSerializer}
          cardsetChosen={this.state.chosenCardset}
          handleAdd={this.handleAdd}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(Admin);
