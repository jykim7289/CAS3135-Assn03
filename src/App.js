import React, { useState } from 'react';
import './App.css';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [sum, setSum] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    if (xInput === '' || yInput === '' || isNaN(xInput) || isNaN(yInput)) {
      setError('Please enter valid numbers.');
      return;
    }

    setError(null);
    setSum(null);
    setProduct(null);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/compute?x=${xInput}&y=${yInput}`);
      const data = await res.json();

      if (data.type === 'success') {
        setSum(data.sum);
        setProduct(data.prod);
      } else setError(data.message);

    } catch (err) {
      setError('Server error occurred.');
    }
  };

  return (
    <div>
      <h2>Calculate Sum and Product</h2>
      <input
        type="number"
        value={xInput}
        placeholder="Enter a number for X"
        onChange={e => setXInput(e.target.value)}
      />
      <br />
      <input
        type="number"
        value={yInput}
        placeholder="Enter a number for Y"
        onChange={e => setYInput(e.target.value)}
      />
      <br />
      <button onClick={calculate} >
        Calculate
      </button>

      <div className="calcResult">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {sum !== null && <p>X + Y = <strong>{sum}</strong></p>}
        {product !== null && <p>X * Y = <strong>{product}</strong></p>}
      </div>
    </div>
  );
}
