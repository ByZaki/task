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
        minHeight: "100vh", // Changed to minHeight to avoid overflow issues
        background: "linear-gradient(to bottom, #f0f8ff, #87cefa)",
        fontFamily: "'Roboto', sans-serif",
        overflow: "hidden", // Prevents any overflow from appearing
        margin: 0, // Removes default margin that might cause scroll
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#2a2a2a",
          marginBottom: "30px",
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        ManagePro
      </h1>

      <nav style={{ marginTop: "20px" }}>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            fontSize: "1.2rem",
            color: "#333",
          }}
        >
          <li>
            <Link
              to="/what-number"
              style={{
                color: "#008cba",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#87cefa")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              What is number?
            </Link>
          </li>
          <li>
            <Link
              to="/calculator"
              style={{
                color: "#008cba",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#87cefa")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              style={{
                color: "#008cba",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#87cefa")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/items"
              style={{
                color: "#008cba",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#87cefa")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
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
