import { Link } from "react-router";
import Task9 from "../components/Task9";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Users() {
  return (
    <>
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      <Task9 />
    </>
  );
}
