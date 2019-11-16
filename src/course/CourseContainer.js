import React from "react";
import styled from "styled-components";
import Course from "./Course";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchCards } from "../api/operations";
import { CardSelectors, CardActions } from "../card/ducks";

const mapStateToProps = ({ card }) => ({
  card,
  cardsets: CardSelectors.getCardsetNames(card)
});

const mapDispatchToProps = dispatch => {
  return {
    getCardSets: () => dispatch(fetchCards()),
    setCards: name => dispatch(CardActions.setCards(name))
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const CourseList = styled.div`
  width: 100%;
  max-wdith: 360px;
`;

class CourseContainer extends React.Component {
  componentDidMount() {
    this.props.getCardSets();
  }

  render() {
    const courses =
      this.props.cardsets.length > 1
        ? this.props.cardsets.map(cardset => {
            return (
              <Course
                key={cardset}
                onClick={() => this.props.setCards(cardset)}
                primary={cardset}
              />
            );
          })
        : null;
    return (
      <CourseList>
        <List component="nav" aria-label="secondary mailbox folders">
          {courses}
        </List>
      </CourseList>
    );
  }
}

export default enhance(CourseContainer);
