import React, { useContext } from 'react';
import Context from '../context/Context';

function ApplyFilterRenders() {
  const { filters, handleRemoveFilter } = useContext(Context);
  return (
    <ul className="display-filters-container">
      {filters.map((filter, index) => {
        const { column, comparison, value } = filter;
        const string = `${column} ${comparison} ${value}`;
        return (
          <li key={ index } data-testid="filter" className="filter-container">
            <span className="filter-container-description">{ string }</span>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filter) }
              className="btn btn-warning"
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ApplyFilterRenders;
