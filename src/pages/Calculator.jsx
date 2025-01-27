import { Link } from "react-router";
import Task4 from "../components/Task4";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Calculator() {
  return (
    <>
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      <Task4 />
    </>
  );
}
