import axios from "axios";
import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
} from "./teamTypes";

export const fetchTeams = () => {
  return (dispatch) => {
    dispatch(fetchTeamsRequest());
    axios
      .get("http://localhost:5000/teams")
      .then((response) => {
        // response.data is the users
        const teams = response.data;
        dispatch(fetchTeamsSuccess(teams));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchTeamsFailure(error.message));
      });
  };
};

export const fetchTeamsRequest = () => {
  return {
    type: FETCH_TEAMS_REQUEST,
  };
};

export const fetchTeamsSuccess = (teams) => {
  return {
    type: FETCH_TEAMS_SUCCESS,
    payload: teams,
  };
};

export const fetchTeamsFailure = (error) => {
  return {
    type: FETCH_TEAMS_FAILURE,
    payload: error,
  };
};
