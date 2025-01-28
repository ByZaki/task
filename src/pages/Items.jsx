import { Link } from "react-router";
import ItemsComponent from "../components/ItemsComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Items() {
  return (
    <>
      <Link to="/">
        <ArrowBackIcon style={{ marginBottom: "50px" }} />
      </Link>
      <ItemsComponent />
    </>
  );
}
