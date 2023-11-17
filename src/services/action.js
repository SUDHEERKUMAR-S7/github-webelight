// searchActions.js


export const FETCH_REPOSITORIES_REQUEST = "FETCH_REPOSITORIES_REQUEST";
export const FETCH_REPOSITORIES_SUCCESS = "FETCH_REPOSITORIES_SUCCESS";
export const FETCH_REPOSITORIES_FAILURE = "FETCH_REPOSITORIES_FAILURE";
export const SET_COMMON_FUNC = "SET_COMMON_FUNC";
export const SET_MAP = "SET_MAP";

export const fetchRepositoriesRequest = () => {
  return {
    type: FETCH_REPOSITORIES_REQUEST
  };
};

export const fetchRepositoriesSuccess = repositories => {
  return {
    type: FETCH_REPOSITORIES_SUCCESS,
    payload: repositories
  };
};

export const fetchRepositoriesFailure = error => {
  return {
    type: FETCH_REPOSITORIES_FAILURE,
    payload: error
  };
};
export const setCommonFunc = (key,value) => {
  return {
    type: SET_COMMON_FUNC,
    payload: {key,value}
  };
};

export const setMapFunc = (key,value) => {
  return {
    type: SET_MAP,
    payload: {key,value}
  };
};

