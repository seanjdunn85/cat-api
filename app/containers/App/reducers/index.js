import { combineReducers } from 'redux-immutable';
import CatReducer from './reducer-cat';
import FavouritesReducer from './reducer-favourites';
import PageReducer from './reducer-page';
import BooksReducer from './reducer-books';
import CategoriesReducer from './reducer-categories';

const allReducers = combineReducers({
	cats:CatReducer,
	page:PageReducer,
	books:BooksReducer,
	favourites:FavouritesReducer,
	categories:CategoriesReducer
});

export default allReducers;

