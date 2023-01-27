import React, { useContext, useState } from 'react';
import '../App.css';
import Context from '../context/Context';

function NumericFilter() {
  const { handleButtonFilter, columnOption } = useContext(Context);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterNumber, setFilterNumber] = useState(0);

  const renderColumnOptions = () => (columnOption.map((option) => (
    <option
      value={ option }
      key={ option }
    >
      { option }
    </option>
  )));

  return (
    <form className="form-group numeric-filter-container">
      {columnOption.length >= 1 ? (
        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            value={ filterColumn }
            name="column-filter"
            id="column-filter"
            onChange={ ({ target }) => setFilterColumn(target.value) }
            className="form-control column-filter"
          >
            { renderColumnOptions() }
          </select>
        </label>
      ) : (
        <div>Maximum Filters Reached</div>
      )}

      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          value={ filterComparison }
          name="comparison-filter"
          id="comparison-filter"
          onChange={ ({ target }) => setFilterComparison(target.value) }
          className="form-control"
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          data-testid="value-filter"
          value={ filterNumber }
          id="value-filter"
          placeholder="Number"
          onChange={ ({ target }) => setFilterNumber(target.value) }
          className="form-control"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        disabled={ columnOption.length === 0 }
        onClick={ () => {
          handleButtonFilter({
            column: filterColumn,
            comparison: filterComparison,
            value: filterNumber,
          }, setFilterColumn);
        } }
        className="btn btn-dark"
      >
        Filter
      </button>
    </form>
  );
}

export default NumericFilter;
