import Button from "./Button/Button";

export default function Task1() {
  const handleClick = () => {
    const arr = prompt("Введите выражение").split("+");

    const result = arr.reduce((sum, current) => sum + +current, 0);
    alert(result);
  };

  return <Button onClick={handleClick}>Калькулятор</Button>;
}
