import { connect } from 'react-redux';
import { compose } from 'redux';
import {createStructuredSelector} from 'reselect';
import {
	makeSelectBooks,
  makeSelectFavourites,
	makeSelectCategories,
} from './selectors';
import CatNav from './CatNav'; 
import {
  getRandomCategoriesPage,
  getCatGifs,
  getCatPage,
  deleteCatFavourite,
  showAlert
} from '../../containers/App/actions';


const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page, book) => dispatch(getCatPage(page, book)),
  deleteCatFavourite: (value)=>dispatch(deleteCatFavourite(value)),
  showAlert: (value)=>dispatch(showAlert()),
  getRandomCategoriesPage: ()=> dispatch(getRandomCategoriesPage())
  
});


const mapStateToProps = createStructuredSelector({
  books: makeSelectBooks(),
  favourites:makeSelectFavourites(),
  categories:makeSelectCategories(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CatNav);