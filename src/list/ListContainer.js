import React from "react";
import styled from "styled-components";
import { Paper, IconButton } from "@material-ui/core";
import "./List.scss";
import List from "./List";
import { connect } from "react-redux";
import { compose } from "redux";
import { CardSelectors, CardActions } from "../card/ducks";
import { addCard, deleteCard, updateCard } from "../api/operations";
import { AddBox } from "@material-ui/icons";

const mapStateToProps = ({ card }) => ({
  card,
  currentCard: CardSelectors.getCurrentCard(card),
  currentCardsSetArray: CardSelectors.getCurrentCardSetArray(card),
  currentCardSet: CardSelectors.getCurrentCardSet(card)
});

const mapDispatchToProps = dispatch => {
  return {
    addCard: currentCardSet => dispatch(addCard(currentCardSet)),
    updateCard: (cardsetId, cardId, side, content) =>
      dispatch(updateCard(cardsetId, cardId, side, content)),
    deleteCard: (currentCardSet, id) => {
      dispatch(deleteCard(currentCardSet, id));
    },
    swapSides: (id, front, back) =>
      dispatch(CardActions.swapSides(id, front, back))
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding: 15px 0;
`;

const AddContainer = styled.div`
  display: flex;
  padding-top: inherit;
`;

function ListContainer(props) {
  console.log("LIST CONTAINER REDRAWN ", props.currentCardsSetArray);

  const deleteCardItem = id => {
    props.deleteCard(props.card.cards[props.currentCardSet], id);
  };

  const updateCardItem = (cardId, side, content) => {
    props.updateCard(
      props.card.cards[props.currentCardSet].id,
      cardId,
      side,
      content
    );
  };

  const ItemList = props.currentCardSet
    ? props.currentCardsSetArray.map(card => {
        return (
          <List
            key={card._id}
            id={card._id}
            front={card.front}
            back={card.back}
            update={updateCardItem}
            delete={deleteCardItem}
            swap={props.swapSides}
          />
        );
      })
    : null;

  return (
    <Container>
      <Paper className="list-paper">
        {ItemList}
        <AddContainer>
          <IconButton
            className="list-plus"
            onClick={() =>
              props.addCard(props.card.cards[props.currentCardSet])
            }
          >
            <AddBox />
          </IconButton>
        </AddContainer>
      </Paper>
    </Container>
  );
}

export default enhance(ListContainer);
