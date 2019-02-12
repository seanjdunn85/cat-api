import { connect } from 'react-redux';
import { compose } from 'redux';
import {createStructuredSelector} from 'reselect';
import {
	makeSelectModal,
} from './selectors';
import {closeModal} from '../../containers/App/actions';
import AlertDialogSlide from './AlertDialogSlide';

const mapDispatchToProps = (dispatch) => ({
  closeModal: (value) => dispatch(closeModal(value)),
});


const mapStateToProps = createStructuredSelector({
  modal: makeSelectModal(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AlertDialogSlide);