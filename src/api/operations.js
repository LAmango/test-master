import * as actions from "./actions";
import { CardActions } from "../card/ducks";
import { CardsetActions } from "../cardset/ducks";

export const fetchCards = () => {
  return dispatch => {
    dispatch(actions.fetchCardsPending());
    fetch("http://localhost:4000/cardsets")
      .then(res => res.json())
      .then(cardsets => {
        if (cardsets.error) {
          throw cardsets.error;
        }
        let cards = {};
        cardsets.map(
          cardset =>
            (cards[cardset.name] = {
              id: cardset._id,
              cards: cardset.cards
            })
        );
        dispatch(actions.fetchCardsSuccess());
        dispatch(CardActions.getCardsets(cards));
        dispatch(
          CardActions.setAllCardsets(cardsets.map(cardset => cardset.name))
        );
        return cardsets;
      })
      .catch(error => {
        dispatch(actions.fetchCardsError(error));
      });
  };
};

export const addCard = currentCardSet => {
  const newCard = { card: { front: "", back: "" } };
  const url = "http://localhost:4000/cardsets/";

  return dispatch => {
    fetch(url + currentCardSet.id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(newCard)
    })
      .then(res => res.json())
      .then(cardset => {
        dispatch(CardActions.addCard(cardset.cards[cardset.cards.length - 1]));
      });
  };
};

export const deleteCard = (currentCardSet, cardId) => {
  return dispatch => {
    const url =
      "http://localhost:4000/cardsets/" + currentCardSet.id + "/" + cardId;
    const body = { delete: "delete" };
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "put",
      body: JSON.stringify(body)
    }).then(dispatch(CardActions.deleteCardItem(cardId)));
  };
};

export const updateCard = (cardsetId, cardId, side, content) => {
  return dispatch => {
    const url = "http://localhost:4000/cardsets/" + cardsetId + "/" + cardId;

    const body = { card: { [side]: content } };

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "put",
      body: JSON.stringify(body)
    }).then(dispatch(CardActions.updateCard(cardId, side, content)));
  };
};

export const addCardset = name => {
  return dispatch => {
    const url = "http://localhost:4000/cardsets";

    const body = { name: name };

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(cardset => dispatch(CardActions.addCardset(name, cardset)))
      .catch(err => console.log(err));
  };
};
