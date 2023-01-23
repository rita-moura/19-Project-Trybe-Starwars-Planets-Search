import React, { useEffect, useState } from 'react';
import '../App.css';

function Table() {
  const [apiData, setApiData] = useState([]);
  const [valueInput, setValueInput] = useState('');
  const [filteredNumber, setFilteredNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    numberInput: 0,
    buttonClick: false,
    numberFilter: [],
  });

  useEffect(() => {
    const fetchApiPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setApiData(data.results);
    };
    fetchApiPlanets();
  }, []);

  const handleChange = ({ target }) => {
    setFilteredNumber({
      ...filteredNumber,
      [target.name]: target.value,
    });
  };

  const planetInfos = apiData.filter((key) => delete key.residents);

  const filteredPlanets = planetInfos.filter((planet) => planet.name
    .toLowerCase().includes(valueInput.toLowerCase()));

  const handleClick = () => {
    if (filteredNumber.comparison === 'maior que') {
      const filtered = filteredPlanets.filter((planet) => (
        +planet[filteredNumber.column] > +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        numberFilter: filtered,
        column: 'population',
        comparison: 'maior que',
        numberInput: 0,
        buttonClick: true,
      });
    } else if (filteredNumber.comparison === 'menor que') {
      const filtered = filteredPlanets.filter((planet) => (
        +planet[filteredNumber.column] < +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        numberFilter: filtered,
        column: 'population',
        comparison: 'maior que',
        numberInput: 0,
        buttonClick: true,
      });
    } else {
      const filtered = filteredPlanets.filter((planet) => (
        +planet[filteredNumber.column] === +filteredNumber.numberInput
      ));
      setFilteredNumber({
        ...filteredNumber,
        numberFilter: filtered,
        column: 'population',
        comparison: 'maior que',
        numberInput: 0,
        buttonClick: true,
      });
    }
  };

  return (
    <div>
      <h3 className="h3">Projeto Star Wars - Trybe</h3>

      <div className="input-group mb-3 input-div">
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Buscar Planeta"
          value={ valueInput }
          onChange={ ({ target }) => setValueInput(target.value) }
        />
      </div>

      <div>
        <label htmlFor="column">
          Coluna
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            value={ filteredNumber.column }
            onChange={ handleChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="comparison">
          Operador
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            value={ filteredNumber.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          type="number"
          name="numberInput"
          value={ filteredNumber.numberInput }
          data-testid="value-filter"
          className="input-number"
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="button-filter"
          className="btn btn-dark"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>

      <div />
      <table className="table table-dark table-striped-columns">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {
          !filteredNumber.buttonClick
            ? (filteredPlanets.map((planet) => (
              <tbody key={ planet.name }>
                <tr>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              </tbody>
            ))) : (
              filteredNumber.numberFilter.map((planet) => (
                <tbody key={ planet.name }>
                  <tr>
                    <td>{planet.name}</td>
                    <td>{planet.rotation_period}</td>
                    <td>{planet.orbital_period}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.gravity}</td>
                    <td>{planet.terrain}</td>
                    <td>{planet.surface_water}</td>
                    <td>{planet.population}</td>
                    <td>{planet.films}</td>
                    <td>{planet.created}</td>
                    <td>{planet.edited}</td>
                    <td>{planet.url}</td>
                  </tr>
                </tbody>
              ))
            )
        }
      </table>

    </div>
  );
}

export default Table;
