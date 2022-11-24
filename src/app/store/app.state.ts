import { CartStoreState } from "./booksCart/cart.state";
import { SessionStoreState } from "./sessionStatus/session.state";

export interface AppStoreState {
  sessionStatus: SessionStoreState;
  cart: CartStoreState;
}
