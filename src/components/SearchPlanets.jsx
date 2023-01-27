import React from 'react';
import '../App.css';
import FilterName from './FilterName';
import FilterNumeric from './FilterNumeric';

function PlanetSeatch() {
  return (
    <section>
      <FilterName />
      <FilterNumeric />
    </section>
  );
}

export default PlanetSeatch;
