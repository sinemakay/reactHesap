import React, { useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState('');
  const [log, setLog] = useState([]);

  const handleCalculate = (event) => {
    event.preventDefault();
    const handleCalculate = (event) => {
        event.preventDefault();
        const calcResult = eval(result); 
        setResult(calcResult);
        };
  };

  const handleLog = () => {
    const handleLog = () => {
        setLog([...log, result]);
        setResult('');
      };
      
  }

  return (
    <div className="App">
      <form onSubmit={handleCalculate}>
        <input type="text" onChange={(e) => setResult(e.target.value)} value={result} />
        <button type="submit">Calculate</button>
      </form>
      <button onClick={handleLog}>Add to Log</button>
      <ul>
        {log.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    </div>
  );
}

export default App;
