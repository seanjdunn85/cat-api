import { combineReducers } from 'redux-immutable';
import FavouritesReducer from './reducer-favourites';
import PageReducer from './reducer-page';
import BooksReducer from './reducer-books';
import CategoriesReducer from './reducer-categories';
import ModalReducer from './reducer-modal';

const allReducers = combineReducers({
	page:PageReducer,
	books:BooksReducer,
	favourites:FavouritesReducer,
	categories:CategoriesReducer,
	modal:ModalReducer
});

export default allReducers;

