import React from 'react';
import TextCompare from './Components/TextCompare';

function App() {
  const leftText = 'Hello world';
  const rightText = 'Hello react';

  return (
    <div style={{ backgroundImage: 'linear-gradient(to bottom, #d6eaff 0%, #b7cbe8 35%, #98b1d6 100%)', height: '100vh'  }}>
      <TextCompare leftText={leftText} rightText={rightText} />
    </div>
  );
};

export default App;