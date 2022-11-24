import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { deleteBooksCartModel, deleteOneBookCartModel, setBooksCartModel } from './cart.actions';
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
  on(deleteOneBookCartModel, (currentState,action) => {
    return {
      ...currentState,
      booksCartModel: currentState.booksCartModel.filter(item => item.id != action.id)
    };
  }),
  on(deleteBooksCartModel, (currentState) => {
    return {
      ...currentState,
      booksCartModel: [],
    };
  })
);
