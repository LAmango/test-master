import React from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Collections from "../admin/Collection";
import SideBar from "../admin/SideBar";
import { compose } from "redux";
import { connect } from "react-redux";
import { apiActions } from "../api";

const mapStateToProps = ({ users, services, card }) => ({
  users,
  services,
  card
});

const actions = {
  getUsers: apiActions.fetchUsers,
  updateUser: apiActions.updateUser,
  deleteUser: apiActions.deleteUser,
  getServices: apiActions.fetchServices,
  addService: apiActions.addService,
  updateService: apiActions.updateSerivce,
  deleteService: apiActions.deleteService
};

const enhance = compose(
  connect(
    mapStateToProps,
    actions
  )
);

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
      chosenCardset: null
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.services !== null &&
      this.props.services !== prevProps.services
    ) {
      this.handleSelect("services");
    }
    if (
      this.props.users.users !== null &&
      this.props.users.users !== prevProps.users.users
    ) {
      this.handleSelect("users");
    }
  }

  handleSelect = (collection, cardsetName = null) => {
    console.log(collection);
    let serializer, chosenCollection;
    switch (collection) {
      case "services":
        serializer = ["_id", "title", "description"];
        chosenCollection = this.props.services;
        break;
      case "users":
        serializer = ["_id", "email", "college"];
        chosenCollection = this.props.users.users;
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

  handleUpdate = (collection, content) => {
    switch (collection) {
      case "services":
        this.props.updateService(
          content._id,
          content.title,
          content.description
        );
        break;
      case "users":
        this.props.updateUser(content._id, {
          college: content.college,
          email: content.email
        });
        break;
      default:
        break;
    }
  };

  handleAdd = (collection, content) => {
    switch (collection) {
      case "services":
        this.props.addService(content.title, content.description);
        break;
      default:
        break;
    }
  };

  handleDelete = (collection, content) => {
    switch (collection) {
      case "services":
        this.props.deleteService(content._id);
        break;
      case "users":
        this.props.deleteUser(content._id);
        break;
      default:
        break;
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
          add={this.handleAdd}
          update={this.handleUpdate}
          del={this.handleDelete}
        />
      </Grid>
    );
  }
}
export default enhance(withStyles(styles)(Admin));
