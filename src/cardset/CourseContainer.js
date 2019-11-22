import React from "react";
import { withStyles } from "@material-ui/styles";
import Course from "./Course";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchCards, addCardset, deleteCardset } from "../api/operations";
import { CardSelectors, CardActions } from "../card/ducks";
import { AddBox } from "@material-ui/icons";
import { IconButton, TextField, ListItem } from "@material-ui/core";

const mapStateToProps = ({ card }) => ({
  cards: CardSelectors.getCards(card),
  cardsets: CardSelectors.getCardsetNames(card),
  currentCardSet: CardSelectors.getCurrentCardSet(card)
});

const mapDispatchToProps = dispatch => {
  return {
    getCardSets: () => dispatch(fetchCards()),
    addCardset: name => dispatch(addCardset(name)),
    setCards: name => dispatch(CardActions.setCards(name)),
    deleteCardset: cardsetId => dispatch(deleteCardset(cardsetId)),
    nextCard: () => dispatch(CardActions.nextCard()),
    prevCard: () => dispatch(CardActions.prevCard()),
    flipCard: () => dispatch(CardActions.flipCard())
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const styles = theme => ({
  courseList: {
    width: "100%",
    maxWidth: 360
  },
  courseHeader: {
    color: theme.palette.primary.main,
    marginBlockEnd: 0
  },
  addContainer: {
    display: "flex",
    paddingTop: "inherit"
  },
  plus: {
    margin: "auto !important"
  }
});

class CourseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false
    };
  }

  componentDidMount() {
    this.props.getCardSets();
    document.addEventListener("keyup", this.handleKeyUp, true);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }

  handleKeyUp = event => {
    console.log("key", event.keyCode);
    switch (event.keyCode) {
      case 32:
        this.props.flipCard();
        break;
      case 39:
        this.props.nextCard();
        break;
      case 37:
        this.props.prevCard();
        break;
      default:
        break;
    }
  };

  preAddCardset() {
    console.log("test");
    this.setState({
      showInput: true
    });
  }
  handleEnter = event => {
    if (event.key === "Enter") {
      this.props.addCardset(event.target.value);
      this.setState({
        showInput: false
      });
    }
  };

  deleteCardset = () => {
    const { currentCardSet, cards } = this.props;
    this.props.deleteCardset(cards[currentCardSet].id);
  };

  render() {
    const { classes } = this.props;
    console.log(this.props.currentCardSet);
    const courses =
      this.props.cardsets.length > 1
        ? this.props.cardsets.map(cardset => {
            return (
              <Course
                key={cardset}
                onClick={() => this.props.setCards(cardset)}
                primary={cardset}
                active={cardset === this.props.currentCardSet}
                deleteCardset={this.deleteCardset}
              />
            );
          })
        : null;
    return (
      <div className={classes.courseList}>
        <h2 className={classes.courseHeader}>Courses</h2>
        <List component="nav" aria-label="secondary mailbox folders">
          {courses}
          {this.state.showInput && (
            <ListItem>
              <TextField onKeyPress={this.handleEnter} />
            </ListItem>
          )}
        </List>

        <div className={classes.addContainer}>
          <IconButton
            className={classes.plus}
            onClick={() => this.preAddCardset()}
          >
            <AddBox />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(enhance(CourseContainer));
