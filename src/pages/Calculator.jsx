import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function Calculator() {
  const [input1, setInput1] = useState("");
  const [selectedExpression, setSelectedExpression] = useState("+");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState(0);

  const calculateResult = (input1, expression, input2) => {
    if (input1 === "" || input2 === "") {
      return setResult(0);
    }

    const num1 = +input1;
    const num2 = +input2;

    switch (expression) {
      case "+":
        setResult(num1 + num2);
        break;
      case "-":
        setResult(num1 - num2);
        break;
      case "*":
        setResult(num1 * num2);
        break;
      case "/":
        setResult(num1 / num2);
        break;
    }
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          padding: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link to="/" style={{ marginBottom: "20px", color: "#1976d2" }}>
          <ArrowBackIcon />
        </Link>

        <Stack direction="row" spacing={2} sx={{ m: 1 }}>
          <TextField
            label="Enter number"
            variant="outlined"
            size="small"
            type="number"
            name="input1"
            onChange={(event) => {
              const { value } = event.target;
              setInput1(value);
              calculateResult(value, selectedExpression, input2);
            }}
            sx={{ flex: 1 }}
          />

          <FormControl sx={{ minWidth: 80 }}>
            <Select
              size="small"
              displayEmpty
              name="expression"
              value={selectedExpression}
              label="Expression"
              inputProps={{ "aria-label": "Without label" }}
              onChange={(event) => {
                const { value } = event.target;
                setSelectedExpression(value);
                calculateResult(input1, value, input2);
              }}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MenuItem value="+">+</MenuItem>
              <MenuItem value="-">-</MenuItem>
              <MenuItem value="*">*</MenuItem>
              <MenuItem value="/">/</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Enter number"
            variant="outlined"
            size="small"
            type="number"
            name="input2"
            onChange={(event) => {
              const { value } = event.target;
              setInput2(value);
              calculateResult(input1, selectedExpression, value);
            }}
            sx={{ flex: 1 }}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>=</div>
          <div
            style={{ fontSize: "30px", fontWeight: "bold", color: "#1976d2" }}
          >
            {result}
          </div>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setInput1("");
            setInput2("");
            setResult(0);
          }}
          sx={{
            marginTop: 3,
            padding: "10px 20px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Clear
        </Button>
      </Stack>
    </>
  );
}
