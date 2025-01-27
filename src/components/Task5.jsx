import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
    <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={openModal}>
        Определить число
      </Button>
      ;
    </Stack>
  );
}
