import {
  REQUEST_CAT_FAVORITES_LIST,
  RECEIVE_CAT_FAVORITES_LIST,
  ERROR_CAT_FAVORITES_LIST,
  CREATE_CAT_FAVORITE,
  DELETE_CAT_FAVORITE,
  FAVOURITE_CAT_IMAGE_SUCCESS,
  FAVOURITE_CAT_IMAGE_DELETED

} from '../constants'

function favourites(state={list:[]}, action){
  
  switch (action.type) {
    case RECEIVE_CAT_FAVORITES_LIST:
      let list = {list:action.payload.json}
      const newState = Object.assign({}, state, list)
      console.log('newState',newState)
      return newState
      break;
    case ERROR_CAT_FAVORITES_LIST:
      console.log(RECEIVE_CAT_FAVORITES_LIST, action)
      console.log('newState',newState)
      return Object.assign({}, state, action.payload.json);
      break;
    case FAVOURITE_CAT_IMAGE_SUCCESS:
      console.log(FAVOURITE_CAT_IMAGE_SUCCESS, action)
      state.list.push(action.payload.json);
      return Object.assign({}, state);
    case FAVOURITE_CAT_IMAGE_DELETED:
      console.log('deleting cat favourite', action, state)
      for (var i = 0; i < state.list.length; i++) {
        if(state.list[i].id == action.payload.favourite_id){
          state.list.splice(i,1);
          break;
        }
      }
      return Object.assign({}, state);
    default:
      return state;

  }
}

export default favourites