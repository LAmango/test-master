import React from "react";
import styled from "styled-components";
import { Paper, IconButton } from "@material-ui/core";
import "./List.scss";
import List from "./List";
import { connect } from "react-redux";
import { compose } from "redux";
import { CardSelectors, CardActions } from "../card/ducks";
import { AddBox } from "@material-ui/icons";

const mapStateToProps = ({ card }) => ({
  currentCard: CardSelectors.getCurrentCard(card),
  currentCardSet: CardSelectors.getCurrentCardSet(card),
  numberOfCards: CardSelectors.getNumberOfCards(card),
  currentCardsSetArray: CardSelectors.getCurrentCardSetArray(card)
});

const actions = {
  addCard: CardActions.addCard,
  nextCard: CardActions.nextCard,
  updateCard: CardActions.updateCard,
  deleteCardItem: CardActions.deleteCardItem,
  swapSides: CardActions.swapSides
};

const enhance = compose(
  connect(
    mapStateToProps,
    actions
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
    props.deleteCardItem(id);
  };

  const ItemList = props.currentCardsSetArray
    ? props.currentCardsSetArray.map(card => {
        return (
          <List
            key={card.id}
            id={card.id}
            front={card.front}
            back={card.back}
            update={props.updateCard}
            delete={deleteCardItem}
            swap={props.swapSides}
          />
        );
      })
    : null;

  return (
    <Container>
      {props.currentCardSet && (
        <Paper className="list-paper">
          {ItemList}
          <AddContainer>
            <IconButton className="list-plus" onClick={props.addCard}>
              <AddBox />
            </IconButton>
          </AddContainer>
        </Paper>
      )}
    </Container>
  );
}

export default enhance(ListContainer);
