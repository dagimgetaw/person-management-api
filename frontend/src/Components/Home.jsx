import { Link } from "react-router-dom";
import "../Styles/home.css";

const Home = () => {
  return (
    <div className="home_page">
      <h2>Person Management API</h2>
      <p>
        A simple CRUD API built with Go for managing person records, using an
        in-memory database for data storage. The API provides endpoints to
        create, read, update, and delete person information, and it includes
        error handling for invalid routes and internal server issues. Each
        person record has a unique ID, name, age, and hobbies. The API supports
        cross-origin requests, allowing it to be accessed by frontend
        applications on different domains.
      </p>
      <button>
        <Link to="/person">See Peoples</Link>
      </button>
    </div>
  );
};

export default Home;
