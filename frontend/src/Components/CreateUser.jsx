import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/createuser.css";

function CreateUser() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobbies, setHobbies] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the new user object
    const newUser = {
      name, // Ensure this matches your backend field name
      age: parseInt(age),
      hobbies: hobbies.split(",").map((hobby) => hobby.trim()),
    };

    // Send the POST request to create a new user
    fetch("http://localhost:8080/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("New User Created:", data);
        // Navigate to the person's detail page after creation
        navigate(`/person/${data.person.ID}`); // Ensure the ID key matches the response structure
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="create-user-container">
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hobbies (comma-separated):</label>
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
