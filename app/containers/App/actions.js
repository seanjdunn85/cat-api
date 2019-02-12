/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,

  RECEIVE_CAT_PAGE,
  REQUEST_CAT_PAGE,
  ERROR_CAT_PAGE,


  REQUEST_CAT_FAVORITES_LIST,
  RECEIVE_CAT_FAVORITES_LIST,
  ERROR_CAT_FAVORITES_LIST,
  CREATE_CAT_FAVORITE,
  DELETE_CAT_FAVORITE,

  FAVOURITE_CAT_IMAGE_SUCCESS,
  FAVOURITE_CAT_IMAGE_DELETED,
  
  RECEIVE_CATEGORIES,

  API_ERROR,
  API_ERROR_CLOSE

} from './constants';

/**
 * initialize the application's action by dispatching a few api calls
 * @return {void} 
 */
export function initApplication(){
  return function(dispatch){
    dispatch(getCatPage(0, 'gifs'))
    dispatch(getCatPage(0, 'images'))
    dispatch(getCatFavourites())
    dispatch(getRandomCategoriesPage())
  }
}


/**
 * [getCatPage description]
 * @param  {int} page The page number to retrieve
 * @param  {string} book The book type to retrieve (images, gifs, favorites)
 * @return {function} Function that execute the http request and dispatches events for the request saga
 */
export function getCatPage(page, book){
    /*the dispatch method is passed into the function we return so we can dispatch states from the api call*/
    return function(dispatch){
      const mime_types =  {
        gifs:'gif',
        images:'png,jpg'
      }
      const mime_type = mime_types[book];
      dispatch(requestCatPage(page))
      var url = new URL("/api/images/search",window.location.origin);
      /*Order must be either ASC or DESC, not default RAND for pagination*/
      var params = {mime_types:mime_type, limit:15, order:"ASC", page}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url).then(
        
        response => response.json(),

        error => dispatch(errorCatPage(error))
        
      ).then(

        json => {
            console.log('cat page received',json, page, book)
            dispatch(receiveCatPage(book, page, json));
          }).catch((err)=>{
            dispatch(errorCatPage(book, page, err))
          })
    }
}

/**
 * requestCatPage
 * @param  {string} book The book name
 * @param  {int} page The page number
 * @param  {object} json The page received
 * @return {action object} 
 */
export function requestCatPage(book, page, json){
  console.log('received cat page in action')
  return {
    type:REQUEST_CAT_PAGE,
    payload:{
      book,
      page,
      json
    }
  }
}


/**
 * [receiveCatPage description]
 * @param  {string} book book type received
 * @param  {int} page the page number received
 * @param  {array} json the array of cat items
 * @return {object]} an action object of type RECEIVE_CAT_PAGE
 */
export function receiveCatPage(book, page, json){
  console.log('received cat page in action')
  return {
    type:RECEIVE_CAT_PAGE,
    payload:{
      book,
      page,
      json
    }
  }
}

export function errorCatPage(book, page, error){
  console.log('dispatching cat page error', error)
  return{
    type:ERROR_CAT_PAGE,
    payload:{
      book,
      page,
      error
    }
  }
}

/**
 * Request the favorites
 * @param  {[type]} argument [description]
 * @return {action object}          [description]
 */
export function requestCatFavoritesList() {
  return {
    type:REQUEST_CAT_FAVORITES_LIST,
    payload:{

    }
  }
}

export function receiveCatFavouritesList(json){

  return {
    type:RECEIVE_CAT_FAVORITES_LIST,
    payload:{
      json
    }
  }
}


/**
 * [errorCatFavouritesList description]
 * @param  {error object} Error 
 * @return {action object} The action 
 */
export function errorCatFavouritesList(error){
  console.log('')
  return {
    type:ERROR_CAT_FAVORITES_LIST,
    payload:{
      error
    }
  }
}


/**
 * [getCatFavourites description]
 * @return {void} [dispatches other actions depending on ajax results]
 */
export function getCatFavourites(){
  console.log('getting cat favourites')
  return function(dispatch){
    var url = new URL("/api/favourites",window.location.origin); 
    fetch(url).then(
      
      response => response.json(),

      error => dispatch(errorCatPage(error))
      
    ).then(

      json => {
          console.log('favorites received',json)
          dispatch(receiveCatFavouritesList(json));
    }).catch(
      err => dispatch(showAlert())
    )
  }
}

export function favouriteCatImage(image){

  return function(dispatch){
    fetch("/api/favourites", {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({"image_id":image.id})
    }).then(
      resp => resp.json(),
      err => dispatch(err)
    ).then(
      json => {
        const payload = Object.assign({}, json, {image_id:image.id});
        dispatch(favouriteCatImageSuccess(payload))
        dispatch(getCatFavourites())
      }
    ).catch(
      err => dispatch(showAlert())
    )
  }
}





export function favouriteCatImageSuccess(json){
  return {
    type:FAVOURITE_CAT_IMAGE_SUCCESS,
    payload:{
      json
    }
  }
}


export function deleteCatFavourite(favourite_id){
  return function(dispatch){
    fetch(`/api/favourites/${favourite_id}`, {
      method:"DELETE",
      headers:{
        'Content-Type':'application/json'
      },
    }).then(
      resp => resp.json(),
      err => dispatch(err)
    ).then(
      json => {
        const payload = Object.assign({}, json, {favourite_id:favourite_id});
        dispatch(favouriteCatImageDeleted(payload))
        dispatch(getCatFavourites())
      }
    ).catch(
      json => dispatch(showAlert())
    )
  }
}

export function favouriteCatImageDeleted(payload){
  return {
    type:FAVOURITE_CAT_IMAGE_DELETED,
    payload:payload
  }
}

export function errorCatFavouriteCatImage(){

}


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function getRandomCategoriesPage(){
  return function(dispatch){
    fetch(`/api/categories`, {
    /*
      This api endpoint does not map directly to TheCatApi, as the rest do.
      Check out the ./server/index.js file to see the relevant logic
      */
    url:'/api/categories',
    method:'GET'

  }).then(
      resp => resp.json(),
      err => dispatch(err)
    ).then(
      json => {
        dispatch(receivedCategoriesPage(json))
      }
    ).catch(
        err => dispatch(showAlert())
    )
  }
}

/**
 * [receivedCategoriesPage description]
 * @param  {json} json [description]
 * @return {object} [action object]
 */
export function receivedCategoriesPage(json) {
  console.log('got categories page', json)
  return {
    type:RECEIVE_CATEGORIES,
    payload:{
      json
    }
  }
}

/**
 * [showAlert description]
 * @param  {json} json [description]
 * @return {object} [action object]
 */
export function showAlert(json) {
  return {
    type:API_ERROR,
    payload:{
      json
    }
  }
}

/**
 * [closeModal description]
 * @param  {json} json [description]
 * @return {object} [action object]
 */
export function closeModal(json) {
  return {
    type:API_ERROR_CLOSE,
    payload:{
      json
    }
  }
}