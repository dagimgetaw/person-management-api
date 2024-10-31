import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Change from Switch to Routes
import Person from "./Components/Person";
import CreateUser from "./Components/CreateUser";
import PersonDetail from "./Components/PersonDetail";
import Home from "./Components/Home"; // Import Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/person" element={<Person />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/person/:id" element={<PersonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
