import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCandidateView from "./components/AddCandidate";
import AppList from "./components/AppList";
import CandidateView from "./components/CandidateView";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <NavBar />
                <AppList />
              </div>
            }
          />
          <Route
            path="/candidate/:id"
            element={
              <div>
                <NavBar />
                <CandidateView />
              </div>
            }
          />
          <Route
            path="/addcandidate"
            element={
              <div>
                <NavBar />
                <AddCandidateView />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
