import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./screens/login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />

          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route exact path="/" component={Login} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
