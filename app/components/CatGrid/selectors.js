import {createSelector} from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCats = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('cats')
);

const makeSelectPage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('page')
);


export {
	selectGlobal,
	makeSelectCats,
	makeSelectPage
}