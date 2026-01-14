import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/home")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }),
      });

      const user = await response.json();
      setCreatedUser(user);
      setUserName("");
    } catch (err) {
      console.error("Error creating user:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "600px" }}>
      <h1>React Frontend</h1>

      {loading && <p>FastAPI is waking up 😴...</p>}

      {!loading && data && (
        <>
          <h2>{data.title}</h2>
          <p>{data.message}</p>
        </>
      )}

      <hr style={{ margin: "30px 0" }} />

      <h2>Create New User</h2>
      <form onSubmit={handleCreateUser}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="userName" style={{ display: "block", marginBottom: "5px" }}>
            Name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{
              padding: "8px",
              width: "100%",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: creating ? "not-allowed" : "pointer",
            opacity: creating ? 0.6 : 1,
          }}
        >
          {creating ? "Creating..." : "Create User"}
        </button>
      </form>

      {createdUser && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
          }}
        >
          <h3>User Created Successfully!</h3>
          <p><strong>ID:</strong> {createdUser.id}</p>
          <p><strong>Name:</strong> {createdUser.name}</p>
        </div>
      )}
    </div>
  );
}

export default Home;