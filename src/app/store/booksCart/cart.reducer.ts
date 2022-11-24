import { createReducer, on } from '@ngrx/store';
import { deleteBooksCartModel, setBooksCartModel } from './cart.actions';
import { CartStoreState, initialCartStoreState } from './cart.state';

export const cartReducer = createReducer<CartStoreState>(
  initialCartStoreState,
  on(
    setBooksCartModel, // yakalamak istediğim action
    (currentState, action) => {
      return {
        ...currentState,
        booksCartModel: [...currentState.booksCartModel ,action.booksCart]
      };
    }
  ),
  on(deleteBooksCartModel, (currentState) => {
    return {
      ...currentState,
      booksCartModel: [],
    };
  })
);
