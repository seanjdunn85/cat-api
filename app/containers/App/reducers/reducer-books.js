import { fromJS } from 'immutable';

import {
  REQUEST_CAT_PAGE,
  RECEIVE_CAT_PAGE,
  ERROR_CAT_PAGE,
  RECEIVE_CAT_FAVOURITES
} from '../constants'

const bookStructure = {
  pages:[],
  currentPage:1
}

const initialState = fromJS({
  gifs: {
    pages:[],
    currentPage:0
  },
  images: {
    pages:[],
    currentPage:0
  },
});

/**
 * [initializeBookStructure description]
 * @param  {[type]} obj  [description]
 * @param  {[type]} book [description]
 * @return {[type]}      [description]
 */
const initializeBookStructure = function(obj, book){
    if(typeof(obj[book]) == 'undefined'){
      obj[book] = {
        pages:[],
        currentPage:0
      };
    }
    return obj;
}

function books(state={}, action){
  switch (action.type) {
    case RECEIVE_CAT_PAGE:
      let {book, page, json} = action.payload;
      if(typeof(state[book]) == 'undefined'){
        state[book] = {
          pages:[],
          currentPage:0
        };
      }
      state[book].pages[page] = json;
      state[book].currentPage = page;
      return Object.assign({}, state);
      break;
    case RECEIVE_CAT_FAVOURITES:
      if(typeof(state['favourites']) == 'undefined'){
        state[book] = {
          pages:[],
          currentPage:0
        };
      }
    default:
      return state;
  }
}

export default books;