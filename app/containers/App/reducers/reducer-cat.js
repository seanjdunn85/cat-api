import { fromJS } from 'immutable';
import {
  REQUEST_CAT_PAGE,
  RECEIVE_CAT_PAGE,
} from '../constants'

const initialState = fromJS({
  cats:[],
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

function cat(state=initialState, action){
  
  switch (action.type) {
    case RECEIVE_CAT_PAGE:
      state.set('cats', action.payload.results);
      console.log('reducer-cat is processing payload')
      console.log(action)
      return state
      break;
    default:
      return state;
  }

}

export default cat