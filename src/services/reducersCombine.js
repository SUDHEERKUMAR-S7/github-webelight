// index.js
import { combineReducers } from "redux";
import profileRreducer from "./reducers";


const rootReducer = combineReducers({
  search: profileRreducer
});

export default rootReducer;
