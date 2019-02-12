import {createSelector} from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectModal = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('modal')
);

export {
	makeSelectModal,
	selectGlobal
}