import { useState } from "react";

export default function Task4() {
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
      <input
        type="number"
        placeholder="введите число"
        name="input1"
        onChange={(event) => {
          const { value } = event.target;
          setInput1(value);
          calculateResult(value, selectedExpression, input2);
        }}
      />

      <select
        name="expression"
        id="expression"
        value={selectedExpression}
        onChange={(event) => {
          const { value } = event.target;
          setSelectedExpression(value);
          calculateResult(input1, value, input2);
        }}
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>

      <input
        type="number"
        placeholder="введите число"
        name="input2"
        onChange={(event) => {
          const { value } = event.target;
          setInput2(value);
          calculateResult(input1, selectedExpression, value);
        }}
      />
      <span>=</span>
      <span>{result}</span>
    </>
  );
}
