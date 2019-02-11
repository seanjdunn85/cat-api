import {createSelector} from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCats = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['cats','cats'])
);

const makeSelectPage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('page')
);
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
	makeSelectCats,
	makeSelectPage,
	makeSelectBooks,
  makeSelectFavourites,
  makeSelectCategories
}