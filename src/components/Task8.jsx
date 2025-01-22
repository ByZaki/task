import { useEffect, useState } from "react";

export default function Task8() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) clearInterval(id);
        return prev - 1;
      });
    }, 1000);
  }, []);

  console.log("render");

  return (
    <>
      <p>{count}</p>
      {/* <button onClick={() => setCount((prev) => prev + 1)}>+</button> */}
      {/* <button onClick={() => setCount(count - 1)}>-</button> */}
    </>
  );
}

// 1. setState(4)
// 2. setState(()=>{
//    return 4
//  })
//      const temp = 'wwww'
//      const result =  4*5*56-651-46+temp
// 3. setState(result)
// 4. setState((state)=> {
//      return state+1+2
//    })
