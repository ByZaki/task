import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link to="/calculator">Calculator</Link>
      <Link to="/users">Users</Link>
      <Link to="/items">Products</Link>
    </>
  );
}
