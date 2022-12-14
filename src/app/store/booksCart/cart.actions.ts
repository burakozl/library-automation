import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book';


export const setBooksCartModel = createAction(
  '[BookCart] Set Books Cart Model', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ booksCart: Book }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);

export const deleteOneBookCartModel = createAction(
  '[BookCart] Delete One Book Cart Model',
  props<{ id: number }>()
);

export const deleteBooksCartModel = createAction(
  '[BookCart] Delete Books Cart Model'
);
