import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/persondetail.css";

function PersonDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/person/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.person); // Assuming your API returns { person: {...} }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return <p>Loading user details...</p>;
  }

  // Error state
  if (error) {
    return <p>Error fetching user details: {error.message}</p>;
  }

  // No user found state
  if (!user) {
    return <p>No user found.</p>;
  }

  // User details view
  return (
    <div className="person-detail-container">
      <h1>User Details</h1>
      <h2>{user.name}</h2>{" "}
      {/* Ensure this property matches your API response */}
      <p>
        <strong>Age:</strong> {user.age}{" "}
        {/* Ensure this property matches your API response */}
      </p>
      <p>
        <strong>Hobbies:</strong> {user.hobbies.join(", ")}{" "}
        {/* Ensure this property matches your API response */}
      </p>
    </div>
  );
}

export default PersonDetail;
