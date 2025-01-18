import { useState } from "react";

export default function Task2() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState(0);

  const calculateResult = (input2) => {
    if (input2 === "") {
      setResult(0);
    } else {
      setResult(+input1 + +input2);
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="введите число"
        name="input1"
        value={input1}
        onChange={(event) => {
          setInput1(event.target.value);
        }}
      />
      <span>+</span>
      <input
        type="number"
        placeholder="введите число"
        name="input2"
        value={input2}
        onChange={(event) => {
          setInput2(event.target.value);
          calculateResult(event.target.value);
        }}
      />
      <span>=</span>
      <span>{result}</span>
    </>
  );
}
