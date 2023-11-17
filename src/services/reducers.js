// searchReducer.js
import {
  FETCH_REPOSITORIES_REQUEST,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_FAILURE,
  SET_COMMON_FUNC,
  SET_MAP
} from "./action";

const initialState = {
  loading: false,
  repositories: [],
  error: "",
  hasMore: true,
  page: 1,
  chartMap: new Map()
};

const profileRreducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        repositories: [...state.repositories, ...action.payload],
        error: "",
        hasMore: true
      };
    case FETCH_REPOSITORIES_FAILURE:
      return {
        ...state,
        loading: false,
        repositories: [],
        error: action.payload
      };
    case SET_COMMON_FUNC:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
      case SET_MAP:
      return {
        ...state,
        chartMap: state.chartMap.set(action.payload.key,action.payload.value)
      };
    default:
      return state;
  }
};

export default profileRreducer;
