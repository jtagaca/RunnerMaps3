import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./screens/login";
import Admin from "./screens/admin";
import User from "./screens/user";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route exact path="/" component={Login} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
