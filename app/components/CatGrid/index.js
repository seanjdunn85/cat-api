import { connect } from 'react-redux';
import { compose } from 'redux';
import {createStructuredSelector} from 'reselect';
import {
	makeSelectCats,
	makeSelectPage
} from './selectors';
import CatGrid from './CatGrid'; 
import {favoriteCatImage} from '../../containers/App/actions';


const mapDispatchToProps = (dispatch) => ({
  onCatImageFavorite: (value) => dispatch(favoriteCatImage(value)),
});


const mapStateToProps = createStructuredSelector({
  cats: makeSelectCats(),
  page: makeSelectPage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CatGrid);