import React from 'react';
import '../App.css';
import ApplyFilterRenders from './ApplyFilterRenders';
import FilterName from './FilterName';
import FilterNumeric from './FilterNumeric';

function PlanetSeatch() {
  return (
    <section>
      <section>
        <FilterName />
        <div className="planet-search-container">
          <FilterNumeric />
        </div>
        <ApplyFilterRenders />
      </section>
    </section>
  );
}

export default PlanetSeatch;
