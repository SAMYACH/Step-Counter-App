import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import UsersContainer from "./components/UsersContainer";
import TeamsContainer from "./components/TeamsContainer";
import Counter from "./components/counter";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Company LeaderBoard Step Counter Application</h1>
        {/* <UsersContainer /> */}
        <TeamsContainer />
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
