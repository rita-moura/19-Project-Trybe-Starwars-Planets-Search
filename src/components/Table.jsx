import React, { useEffect, useState } from 'react';
import '../App.css';

function Table() {
  const [apiData, setApiData] = useState([]);
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    const fetchApiPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setApiData(data.results);
    };
    fetchApiPlanets();
  }, []);

  const planetInfos = apiData.filter((key) => delete key.residents);

  const filteredPlanet = planetInfos.filter((planet) => planet.name
    .toLowerCase().includes(valueInput.toLowerCase()));

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
          filteredPlanet.map((planet) => (
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
        }
      </table>
    </div>
  );
}

export default Table;
