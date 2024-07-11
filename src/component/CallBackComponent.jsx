import { useCallback, useState } from "react";
import { Incrementar } from "./Incrementar";

export const CollBackComponent = () => {
  const [counter, setCounter] = useState(0);

  const incrementarPadre = useCallback((val) => {
    setCounter((contador) => contador + val);
  }, []);
  return (
    <>
      <h1>Contador: {counter}</h1>
      <Incrementar incrementar={incrementarPadre}></Incrementar>
    </>
  );
};
