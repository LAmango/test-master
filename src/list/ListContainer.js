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
  card,
  currentCard: CardSelectors.getCurrentCard(card),
  currentCardSet: CardSelectors.getCurrentCardSet(card),
  numberOfCards: CardSelectors.getNumberOfCards(card)
});

const actions = {
  addCard: CardActions.addCard,
  updateCard: CardActions.updateCard
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
  const { cards } = props.card;
  return (
    <Container>
      {props.currentCardSet && (
        <Paper className="list-paper">
          {Object.keys(cards[props.currentCardSet]).map(index => {
            return (
              <List
                key={index}
                id={index}
                front={cards[props.currentCardSet][index].front}
                back={cards[props.currentCardSet][index].back}
                update={props.updateCard}
              />
            );
          })}
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
