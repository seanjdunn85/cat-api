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
  deleteCatFavourite
} from '../../containers/App/actions';


const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page, book) => dispatch(getCatPage(page, book)),
  deleteCatFavourite: (value)=>{dispatch(deleteCatFavourite(value))}
});


const mapStateToProps = createStructuredSelector({
  page: makeSelectPage(),
  books: makeSelectBooks(),
  favourites:makeSelectFavourites(),
  categories:makeSelectCategories(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CatNav);