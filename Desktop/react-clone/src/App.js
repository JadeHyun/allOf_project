import React, { Component } from 'react';
import FirHeader from "./component_1/header-fir";
import SecHeader from "./component_1/header-sec";
import InputFir from "./component_1/input-fir";


import './App.css';

function App() {
  return (
    <div className="App">
      <FirHeader></FirHeader>
      <SecHeader></SecHeader>
      <InputFir></InputFir>

    </div>
  );
}

export default App;
