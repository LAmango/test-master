import * as actions from "../api/actions";
import { CardActions } from "../card/ducks";
import api, { types } from "../api";

var base_url =
  process.env.NODE_ENV === "production"
    ? "http://testmasterlive.com"
    : "http://localhost:4000";

export const apiMiddleware = store => next => action => {
  console.log(process.env.NODE_ENV, process.env);
  if (action.type === types.FETCH_CARDS) {
    store.dispatch(actions.fetchCardsPending());
    api
      .get("cardsets")
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
        store.dispatch(actions.fetchCardsSuccess());
        store.dispatch(CardActions.getCardsets(cards));
        store.dispatch(
          CardActions.setAllCardsets(cardsets.map(cardset => cardset.name))
        );
        return cardsets;
      })
      .catch(error => {
        store.dispatch(actions.fetchCardsError(error));
      });
  } else if (action.type === types.ADD_CARD) {
    const newCard = { card: { front: "", back: "" } };
    const url = "cardsets/" + action.payload;

    api.post(url, newCard).then(cardset => {
      store.dispatch(
        CardActions.addCard(cardset.cards[cardset.cards.length - 1])
      );
    });
  } else if (action.type === types.UPDATE_CARD) {
    const [cardsetId, cardId, side, content] = action.payload;

    const url = "cardsets/" + cardsetId + "/" + cardId;

    const body = { card: { [side]: content } };

    api
      .put(url, body)
      .then(store.dispatch(CardActions.updateCard(cardId, side, content)));
  } else if (action.type === types.DELETE_CARD) {
    const [cardsetId, cardId] = action.payload;

    const url = "cardsets/" + cardsetId + "/" + cardId;
    const body = { delete: "delete" };
    api.put(url, body).then(store.dispatch(CardActions.deleteCardItem()));
  } else if (action.type === types.ADD_CARDSET) {
    const url = "cardsets";
    const [name] = action.payload;
    const body = { name: name };

    api
      .post(url, body)
      .then(cardset =>
        store.dispatch(
          CardActions.addCardset(name, {
            id: cardset._id,
            cards: cardset.cards
          })
        )
      )
      .catch(err => console.log(err));
  } else if (action.type === types.DELETE_CARDSET) {
    const [cardsetId] = action.payload;
    const url = "cardsets/" + cardsetId;

    api
      .del(url)
      .then(cardset => store.dispatch(CardActions.deleteCardset(cardset)))
      .catch(err => console.log(err));
  }

  next(action);
};
