// React and others
import React from "react";
import { useSpring, animated as a } from "react-spring";
// Styles and Props
import styled from "styled-components";
import "./Card.scss";
// Material-ui
import { Paper } from "@material-ui/core";
// Custom Components
import Layout from "../common/Layout";
import Card from "./Card";
// Redux
import { connect } from "react-redux";
import { compose } from "redux";
import { CardActions, CardSelectors } from "./ducks";

const mapStateToProps = ({ card }) => ({
  card,
  currentCard: CardSelectors.getCurrentCard(card),
  currentCardSet: CardSelectors.getCurrentCardSet(card),
  numberOfCards: CardSelectors.getNumberOfCards(card),
  currentCardSetArray: CardSelectors.getCurrentCardSetArray(card)
});

const actions = {
  nextCard: CardActions.nextCard,
  prevCard: CardActions.prevCard,
  flipCard: CardActions.flipCard
};

const enhance = compose(
  connect(
    mapStateToProps,
    actions
  )
);

const Container = styled.div`
  margin: 15px auto;
  position: relative;
  width: 500px;
  height: 300px;
  justify-content: center;
`;

const CardButtons = styled.div`
  margin: auto;
  width: fit-content;
`;

const CardButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  text-transform: uppercase;
  background-color: white;
  border-radius: 5px;
  font-size: 15px;
  transition: 0.2s;
  :focus {
    outline: none;
  }
  :active {
    border-style: solid;
  }
  :hover {
    background-color: rgb(88, 118, 168);
    color: white;
    border-color: white;
  }
`;

function CardContainer(props) {
  const { transform, opacity } = useSpring({
    opacity: props.card.flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${props.card.flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  return (
    <Layout>
      {props.currentCardSet && (
        <>
          <Container onClick={props.flipCard}>
            <a.div
              className="flip"
              style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
            >
              <Paper className="paper">
                <Card
                  cardSet={props.currentCardSet}
                  total={props.numberOfCards}
                  current={props.currentCard + 1}
                  side={props.currentCardSetArray[props.currentCard].front}
                />
              </Paper>
            </a.div>

            <a.div
              className="flip"
              style={{
                opacity,
                transform: transform.interpolate(t => `${t} rotateX(180deg)`)
              }}
            >
              <Paper className="paper">
                <Card
                  cardSet={props.currentCardSet}
                  total={props.numberOfCards}
                  current={props.currentCard + 1}
                  side={props.currentCardSetArray[props.currentCard].back}
                />
              </Paper>
            </a.div>
          </Container>

          <CardButtons>
            {props.currentCardSet && (
              <>
                <CardButton className="btn" onClick={() => props.prevCard()}>
                  Previous
                </CardButton>
                <CardButton className="btn" onClick={() => props.nextCard()}>
                  Next
                </CardButton>
              </>
            )}
          </CardButtons>
        </>
      )}
    </Layout>
  );
}

export default enhance(CardContainer);
