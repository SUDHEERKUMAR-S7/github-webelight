import { fetchRepositoriesFailure,fetchRepositoriesRequest,fetchRepositoriesSuccess, setMapFunc } from "./action";
import axios from "axios";
export const fetchRepositories = (date, page) => {
    return dispatch => {
      dispatch(fetchRepositoriesRequest());
      axios
        .get(`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`)
        .then(response => {
          const repositories = response.data.items;
          dispatch(fetchRepositoriesSuccess(repositories));
        })
        .catch(error => {
          dispatch(fetchRepositoriesFailure(error.message));
        });
    };
  };

  export const fetchSingleData = (owner, type ,setToggleIcon,setLoader) => {
    return dispatch => {
      axios
        .get(`https://api.github.com/repos/${owner}/stats/${type}`)
        .then(response => {
          console.log(response);
          dispatch(setMapFunc(owner+type,response?.data));
          setToggleIcon((prev) => !prev);
          setLoader(false);
        })
        .catch(error => {
          // dispatch(fetchRepositoriesFailure(error.message));
          dispatch(setMapFunc(owner+type,{}));
          setToggleIcon((prev) => !prev);
          setLoader(false);
        });
    };
  };