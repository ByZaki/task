import Stack from "@mui/material/Stack";
import { Link } from "react-router";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function isNaturalNumber(number) {
  return number > 0 && Number.isInteger(number);
}

function isNotInteger(number) {
  return !Number.isInteger(number);
}

export default function Task5() {
  const [result, setResult] = useState("");

  const openModal = () => {
    const number = +prompt("Enter a number");

    if (isNaN(number)) {
      alert("Please enter a valid number");
      return;
    }

    const evenOdd = number % 2 === 0 ? "even" : "odd";
    const natural = isNaturalNumber(number) ? "natural" : "not natural";
    const positiveOrNegative = number > 0 ? "positive" : "negative";
    const notInteger = isNotInteger(number) ? "integer" : "not integer";

    const result = `${evenOdd}\n${natural}\n${positiveOrNegative}\n${notInteger}`;
    setResult(result);
  };

  return (
    <>
      <Stack
        sx={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: 2 }}
      >
        <Link to="/" style={{ marginBottom: "20px", color: "#1976d2" }}>
          <ArrowBackIcon />
        </Link>

        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
            Number Classification
          </Typography>
          <Button
            sx={{
              padding: "12px 30px",
              borderRadius: "30px",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              color: "#1976d2",
              border: "2px solid #1976d2",
              "&:hover": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
            }}
            variant="outlined"
            onClick={openModal}
          >
            Classify Number
          </Button>
        </Stack>

        {result && (
          <Stack
            sx={{
              marginTop: 3,
              padding: "15px",
              backgroundColor: "#f0f8ff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6">Result:</Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {result}
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
}
