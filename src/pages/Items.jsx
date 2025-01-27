import { Link } from "react-router";
import Task10 from "../components/Task10";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Items() {
  return (
    <>
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      <Task10 />
    </>
  );
}
