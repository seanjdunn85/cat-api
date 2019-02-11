import { connect } from 'react-redux';
import { compose } from 'redux';
import {createStructuredSelector} from 'reselect';

import {
	makeSelectCats,
	makeSelectPage,
	makeSelectBooks,
	makeSelectGifPage,
	makeSelectCurrentPage,
	makeSelectFavourites
} from './selectors';
import CatScreen from './CatScreen'; 
import {getCatPage, favouriteCatImage, deleteCatFavourite} from '../../containers/App/actions';


const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page, book) => dispatch(getCatPage(page, book)),
  favouriteCatImage: (image) => dispatch(favouriteCatImage(image)),
  deleteCatFavourite: (image) => dispatch(deleteCatFavourite(image)),
});


const mapStateToProps = createStructuredSelector({
  cats: makeSelectCats(),
  page: makeSelectPage(),
  books:makeSelectBooks(),
  favourites:makeSelectFavourites()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CatScreen);