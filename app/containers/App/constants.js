/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';

export const REQUEST_CAT_FAVORITES_LIST = 'REQUEST_CAT_FAVORITES_LIST'
export const RECEIVE_CAT_FAVORITES_LIST = 'RECEIVE_CAT_FAVORITES_LIST'
export const ERROR_CAT_FAVORITES_LIST = 'ERROR_CAT_FAVORITES_LIST';
export const CREATE_CAT_FAVORITE = 'CREATE_CAT_FAVORITE';
export const DELETE_CAT_FAVORITE = 'DELETE_CAT_FAVORITE';
export const FAVOURITE_CAT_IMAGE_SUCCESS = 'FAVOURITE_CAT_IMAGE_SUCCESS';
export const FAVOURITE_CAT_IMAGE_DELETED = 'FAVOURITE_CAT_IMAGE_DELETED';

export const REQUEST_CAT_PAGE = 'REQUEST_CAT_PAGE';
export const RECEIVE_CAT_PAGE = 'RECEIVE_CAT_PAGE';
export const ERROR_CAT_PAGE = 'ERROR_CAT_PAGE';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLOSE = 'API_ERROR_CLOSE';
