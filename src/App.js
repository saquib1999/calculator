import React, { useState } from "react";
import "./App.css";

function App() {
  const ERROR = "ERROR";
  const [err, setErr] = useState(false);
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const contEval = (val) => {
    try {
      setResult(eval(val));
    } catch (error) {
      console.log("error");
    }
  };

  const validKeys = [
    "/",
    "*",
    "+",
    "-",
    ".",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  const onKeyPressHandler = (e) => {
    console.log(e.key);
    if (["Enter", "="].includes(e.key)) {
      console.log("aa");

      evaluateResult();
    } else if (validKeys.includes(e.key)) {
      console.log("bb");

      updateCalc(e.key.toString());
    }
  };
  const updateCalc = (value) => {
    if (err) {
      setCalc(value);
      setErr(false);
    } else {
      console.log(value, "cc");
      let newValue = calc + value;
      contEval(newValue);
      setCalc(newValue);
      value = "";
    }
  };
  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const evaluateResult = () => {
    if (calc && !err) {
      if (calc === "Infinity") {
        console.log("Infinity");

        setResult("Infinity");
        setCalc("Infinity");
      } else {
        try {
          let value = eval(calc).toString();
          setResult(value);
          setCalc(value);
        } catch (error) {
          setResult("");
          setCalc(ERROR);
          setErr(true);
        }
      }
    }
  };

  const delDigit = () => {
    if (err) {
      setErr(false);
      setCalc("");
    } else if (calc) {
      setResult("");
      let newValue = calc.slice(0, -1);
      setCalc(newValue);
      contEval(newValue);
    }
  };
  return (
    <div className="App" onKeyDown={onKeyPressHandler}>
      <div className="calculator">
        <h1>Calculator</h1>
        <div className="display">
          {result ? <span>({result})</span> : ""}
          {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={delDigit}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={evaluateResult}>=</button>
        </div>
        <div className="buttons"></div>
      </div>
    </div>
  );
}

export default App;
