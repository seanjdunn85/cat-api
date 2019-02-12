import {createSelector} from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectBooks = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('books')
);

const makeSelectFavourites = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('favourites')
);
const makeSelectCategories = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('categories')
);


export {
	selectGlobal,
	makeSelectBooks,
  makeSelectFavourites,
  makeSelectCategories
}