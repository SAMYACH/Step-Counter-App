import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTeams } from "../redux/team/teamActions";

function TeamsContainer(props) {
  useEffect(() => {
    props.fetchTeams();
  }, []);
  return props.team.loading ? (
    <h2>Loading</h2>
  ) : props.team.error ? (
    <h2>{props.team.error}</h2>
  ) : (
    <>
      <div>
        <h1> Leaderboard Counter for teams :-</h1>
        {props.team &&
          props.team.teams &&
          props.team.teams.map((team) => (
            <table>
              <tr>
                <th>Team Name</th>
                <br></br>
                <th>Step Count</th>
                <br></br>
                <th>Score</th>
                <br></br>
              </tr>
              <tr>
                <td>{team.teamName}</td>
                <br></br>
                <td>{team.stepCount}</td>
                <br></br>
                <td>{team.score}</td>
                <br></br>
              </tr>
            </table>
          ))}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    team: state.team,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeams: () => dispatch(fetchTeams()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsContainer);
