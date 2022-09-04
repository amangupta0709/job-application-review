import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AppList from "./components/AppList";
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
                {/* <ProtectedRoute> */}
                <NavBar />
                {/* <Dashboard /> */}
                <AppList />
                {/* </ProtectedRoute> */}
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
