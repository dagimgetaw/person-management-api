import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../Styles/person.css";

function Person() {
  const [data, setData] = useState([]); // Renamed to 'data' for clarity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update the fetch URL to point to the correct endpoint
    fetch("http://localhost:8080/person") // Ensure this URL matches your API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.person); // Adjust to access 'person' if your API returns { person: [...] }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/person/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Remove the deleted user from the state
        setData((prevData) => prevData.filter((user) => user.ID !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="person-container">
      <h1>Person Data</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}
      {!loading && !error && data.length === 0 && <p>No users found.</p>}
      {!loading && !error && data.length > 0 && (
        <div className="person-list">
          {data.map((user, index) => (
            <div key={user.ID} className="person-card">
              <Link to={`/person/${user.ID}`} className="person-details-link">
                <p>
                  <strong>{index + 1}. </strong>
                  <span className="person-details">
                    {user.Name}, Age: {user.Age}, Hobbies:{" "}
                    {user.Hobbies.join(", ")}
                  </span>
                </p>
              </Link>
              <button
                className="remove-user-button"
                onClick={() => handleDelete(user.ID)}
              >
                Remove User
              </button>
              <hr className="line" />
            </div>
          ))}
        </div>
      )}
      <div className="buttons">
        <button className="create">
          <Link to="/create-user" className="create-user-button">
            Create New User
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Person;
