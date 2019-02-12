import { fromJS } from 'immutable';

import {
  RECEIVE_CATEGORIES
} from '../constants'



function categories(state={}, action){
  switch (action.type) {
    case RECEIVE_CATEGORIES:
  		console.log(RECEIVE_CATEGORIES, action)
      return Object.assign({}, action.payload);
      break;
    default:
      return state;
  }
}

export default categories;