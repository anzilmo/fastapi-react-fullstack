import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/home")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>React Frontend</h1>

      {data ? (
        <>
          <h2>{data.title}</h2>
          <p>{data.message}</p>
        </>
      ) : (
        <p>FastAPI is </p>
      )}
    </div>
  );
}

export default App;