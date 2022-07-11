import React from 'react';

// styled-components import
import styled from 'styled-components';
// Circle.tsx import
import Circle from './Circle';


function App() {
  return (
    <div className="App">
      <Circle borderColor="red" bgColor="teal"/>
      <Circle text="I'm jinyoung" bgColor="tomato"/>
    </div>
  );
}

export default App;
