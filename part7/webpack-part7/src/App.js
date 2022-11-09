import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="container">
      hello webpack {counter} clicks
      <p>is this automatic showing. It seems like that.</p>
      <button onClick={() => setCounter(counter + 1)}>press</button>
    </div>
  );
};

export default App;
