import { Book } from "src/app/models/book";


export interface CartStoreState {
  booksCartModel: Book[];
}

export const initialCartStoreState: CartStoreState = {
  booksCartModel: []
};
