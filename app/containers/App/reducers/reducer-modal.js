import { fromJS } from 'immutable';

import {
  API_ERROR,
  API_ERROR_CLOSE
} from '../constants'



function modal(state={showError:false, errorHasBeenShown:false}, action){
  switch (action.type) {
    case API_ERROR:
    	if(state.errorHasBeenShown){
    		return state;
    	}else{
      		return Object.assign({}, {showError:true, errorHasBeenShown:true});
    	}
    	console.log(API_ERROR, action)
      break;
    case API_ERROR_CLOSE:
    	console.log(API_ERROR_CLOSE, action)
      return Object.assign({}, {showError:false});
      break;
    default:
      return state;
  }
}

export default modal;