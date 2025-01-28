import { Link } from "react-router";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #f0f8ff, #87cefa)",
      }}
    >
      <h1>My Subproject</h1>
      <nav style={{ marginTop: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <Link
              to="/calculator"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "20px",
              }}
            >
              Calculator
            </Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link
              to="/users"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "20px",
              }}
            >
              Users
            </Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link
              to="/items"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "20px",
              }}
            >
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
