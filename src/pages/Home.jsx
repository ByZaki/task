import { Link } from "react-router";
import ModalForDelete from "../components/ModalForDelete";

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
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "25px",
          }}
        >
          <li>
            <Link
              to="/what-number"
              style={{
                color: "blue",
                textDecoration: "none",
              }}
            >
              What is number?
            </Link>
          </li>
          <li>
            <Link
              to="/calculator"
              style={{
                color: "blue",
                textDecoration: "none",
              }}
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              style={{
                color: "blue",
                textDecoration: "none",
              }}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/items"
              style={{
                color: "blue",
                textDecoration: "none",
              }}
            >
              Products
            </Link>
          </li>
        </ul>
      </nav>
      <ModalForDelete />
    </div>
  );
}
