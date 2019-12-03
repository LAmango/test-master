import * as actions from "../api/actions";
import { UserActions } from "./users";
import { CardActions } from "../card/ducks";
import { ServiceActions } from "../services";
import api, { types } from "../api";

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
    api.put(url, body).then(store.dispatch(CardActions.deleteCardItem(cardId)));
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
  } else if (action.type === types.FETCH_SERVICES) {
    api
      .get("services")
      .then(services => store.dispatch(ServiceActions.setServices(services)));
  } else if (action.type === types.UPDATE_SERVICE) {
    const newService = {
      title: action.payload[1],
      description: action.payload[2]
    };
    const [id, title, description] = action.payload;
    api
      .put("services/" + action.payload[0], newService)
      .then(() =>
        store.dispatch(ServiceActions.updateService(id, title, description))
      );
  } else if (action.type === types.DELETE_SERIVICE) {
    const [serviceId] = action.payload;

    api
      .del("services/" + serviceId)
      .then(() => store.dispatch(ServiceActions.deleteServices(serviceId)));
  } else if (action.type === types.ADD_SERVICE) {
    const [title, description] = action.payload;
    const newService = { title: title, description: description };

    api
      .post("services", newService)
      .then(service => store.dispatch(ServiceActions.addService(service)));
  } else if (action.type === types.LOGIN) {
    const [email, password] = action.payload;

    api.post("login", { email: email, password: password }).then(res => {
      if (res.err) {
        store.dispatch(UserActions.setError(res.err));
      } else {
        store.dispatch(UserActions.setUser(res));
      }
    });
  } else if (action.type === types.REGISTER) {
    const [email, password] = action.payload;
    api.post("register", { email: email, password: password }).then(user => {
      if (user.err) {
        store.dispatch(UserActions.setError(user.err));
      } else {
        store.dispatch(UserActions.setUser(user));
      }
    });
  } else if (action.type === types.FETCH_USERS) {
    api.get("users").then(users => store.dispatch(UserActions.setUsers(users)));
  } else if (action.type === types.UPDATE_USER) {
    api
      .put("users/" + action.payload[0], action.payload[1])
      .then(user =>
        store.dispatch(UserActions.updateUser(user))
      );
  } else if (action.type === types.UPDATE_CURRENT_USER) {
    const [userId, newUser] = action.payload;

    api
      .put("users/" + userId, newUser)
      .then(user => store.dispatch(UserActions.updateCurrentUser(user)));
  } else if (action.type === types.DELETE_USER) {
    const [userId] = action.payload;

    api
      .del("users/" + userId)
      .then(() => store.dispatch(UserActions.deleteUser(userId)));
  }

  next(action);
};
