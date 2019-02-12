import { connect } from 'react-redux';
import { compose } from 'redux';
import CatTile from './CatTile';
import {createStructuredSelector} from 'reselect';
import {
	makeSelectFavourites
} from './selectors';
import {getCatPage, favouriteCatImage, deleteCatFavourite} from '../../containers/App/actions';

const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page, book) => dispatch(getCatPage(page, book)),
  favouriteCatImage: (image) => dispatch(favouriteCatImage(image)),
  deleteCatFavourite: (image) => dispatch(deleteCatFavourite(image)),
});


const mapStateToProps = createStructuredSelector({
  favourites:makeSelectFavourites(
)});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CatTile)
