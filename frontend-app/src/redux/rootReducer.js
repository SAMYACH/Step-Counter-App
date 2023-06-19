import { combineReducers } from "redux";
import teamReducer from "./team/teamReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  team: teamReducer,
  user: userReducer,
});

export default rootReducer;
