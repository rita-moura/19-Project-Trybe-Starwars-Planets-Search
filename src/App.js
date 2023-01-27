import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import Header from './components/Header';
import SearchPlanet from './components/SearchPlanets';

function App() {
  return (
    <Provider>
      <Header />
      <SearchPlanet />
      <Table />
    </Provider>
  );
}

export default App;
