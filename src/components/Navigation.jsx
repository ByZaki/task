import { Link } from "react-router";

export default function Navigation() {
  return (
    <>
      <nav>
        <Link to="/home" />
        <Link to="/users" />
        <Link to="/items" />
      </nav>
    </>
  );
}
