import { Link } from "react-router";
import UsersComponent from "../components/UsersComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Users() {
  return (
    <>
      <Link to="/">
        <ArrowBackIcon style={{ marginBottom: "50px" }} />
      </Link>
      <UsersComponent />
    </>
  );
}
