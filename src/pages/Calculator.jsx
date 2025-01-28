import { Link } from "react-router";
import CalculatorComponent from "../components/CalculatorComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Calculator() {
  return (
    <>
      <Link to="/">
        <ArrowBackIcon style={{ marginBottom: "50px" }} />
      </Link>
      <CalculatorComponent />
    </>
  );
}
