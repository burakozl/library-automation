import { cartReducer } from "./booksCart/cart.reducer";
import { sessionReducer } from "./sessionStatus/session.reducer";

export const appReducers = {
  sessionStatus: sessionReducer,
  cart: cartReducer
};
