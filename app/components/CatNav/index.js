import { connect } from 'react-redux';
import { compose } from 'redux';
import {createStructuredSelector} from 'reselect';
import {
	makeSelectCats,
	makeSelectPage,
	makeSelectBooks,
  makeSelectFavourites,
	makeSelectCategories,
} from './selectors';
import CatNav from './CatNav'; 
import {
  getCatGifs,
  getCatPage,
  deleteCatFavourite,
  showAlert
} from '../../containers/App/actions';


const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page, book) => dispatch(getCatPage(page, book)),
  deleteCatFavourite: (value)=>dispatch(deleteCatFavourite(value)),
  showAlert: (value)=>dispatch(showAlert())
});


const mapStateToProps = createStructuredSelector({
  page: makeSelectPage(),
  books: makeSelectBooks(),
  favourites:makeSelectFavourites(),
  categories:makeSelectCategories(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CatNav);