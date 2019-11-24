import * as actions from "./actions";
import { CardActions } from "../card/ducks";

var base_url = "http://localhost:4000";

export const fetchCards = () => {
  return dispatch => {
    dispatch(actions.fetchCardsPending());
    fetch(base_url + "/cardsets", {
      mode: "cors"
    })
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
  const url = base_url + "/cardsets/";

  return dispatch => {
    fetch(url + currentCardSet.id, {
      mode: "cors",
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
    const url = base_url + "/cardsets/" + currentCardSet.id + "/" + cardId;
    const body = { delete: "delete" };
    fetch(url, {
      mode: "cors",
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
    const url = base_url + "/cardsets/" + cardsetId + "/" + cardId;

    const body = { card: { [side]: content } };

    fetch(url, {
      mode: "cors",
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
    const url = base_url + "/cardsets";

    const body = { name: name };

    fetch(url, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(cardset =>
        dispatch(
          CardActions.addCardset(name, {
            id: cardset._id,
            cards: cardset.cards
          })
        )
      )
      .catch(err => console.log(err));
  };
};

export const deleteCardset = cardsetId => {
  return dispatch => {
    const url = base_url + "/cardsets/" + cardsetId;

    fetch(url, {
      mode: "cors",
      method: "delete"
    })
      .then(res => res.json())
      .then(cardset => dispatch(CardActions.deleteCardset(cardset)))
      .catch(err => console.log(err));
  };
};
