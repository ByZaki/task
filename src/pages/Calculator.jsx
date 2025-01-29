import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormControl, MenuItem, Select, Stack, TextField } from "@mui/material";
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
          width: "600px",
          margin: "0 auto",
        }}
      >
        <Link to="/" style={{ marginBottom: "20px", width: "fit-content" }}>
          <ArrowBackIcon />
        </Link>
        <Stack direction="row" spacing={1} sx={{ m: 1, minWidth: 240 }}>
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
          />

          <FormControl>
            <Select
              size="small"
              displayEmpty
              name="expression"
              value={selectedExpression}
              label="Age"
              inputProps={{ "aria-label": "Without label" }}
              onChange={(event) => {
                const { value } = event.target;
                setSelectedExpression(value);
                calculateResult(input1, value, input2);
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
          />
          <div style={{ fontSize: "30px" }}>=</div>
          <div style={{ fontSize: "30px" }}>{result}</div>
        </Stack>
      </Stack>
    </>
  );
}
