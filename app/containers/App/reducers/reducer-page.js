import {
  REQUEST_CAT_FAVORITES,
  RECEIVE_CAT_FAVORITES,
  REQUEST_CAT_PAGE,
  RECEIVE_CAT_PAGE,
} from '../constants'

function page(state=null, action){
  switch (action.type) {
    case RECEIVE_CAT_FAVORITES:
      if(state == null){
        state = {};
      }
      state.favorites = {};
      state.favorites.pageNumber = action.payload.page;
      state.favorites.page = action.payload.results;
      return state
      break;
    case RECEIVE_CAT_PAGE:
      console.log('in receive cat page',action.type)
      if(state == null){
        state = {};
      }
      state.book = {};
      state.book.pageNumber = action.payload.page;
      state.book.page = action.payload.results;
      return state
      break;
    default:
      return state;
  }
}

export default page;