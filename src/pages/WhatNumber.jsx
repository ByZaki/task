import Stack from "@mui/material/Stack";
import { Link } from "react-router";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function isNaturalNumber(number) {
  return number > 0 && Number.isInteger(number);
}

function isNotInteger(number) {
  return Number.isInteger(number);
}

export default function Task5() {
  const openModal = () => {
    const number = +prompt("Введите число");
    const evenOdd = number % 2 === 0 ? "четное" : "нечетное";
    const natural = isNaturalNumber(number) ? "натуральное" : "не натуральное";
    const positiveOrNegative = number > 0 ? "положительное" : "отрицательное";
    const notInteger = isNotInteger(number) ? "целое" : "не целое";

    const result = `${evenOdd}\n${natural}\n${positiveOrNegative}\n${notInteger}`;
    alert(result);
  };

  return (
    <>
      <Stack sx={{ width: "900px", margin: "0 auto" }}>
        <Link to="/" style={{ marginBottom: "20px", width: "fit-content" }}>
          <ArrowBackIcon />
        </Link>
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            sx={{ width: "fit-content" }}
            variant="outlined"
            onClick={openModal}
          >
            Определить число
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
