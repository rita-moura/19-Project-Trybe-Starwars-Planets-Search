import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { loading, dataFilter } = useContext(Context);

  return (
    <section>
      { loading && <h2>Loading...</h2> }
      { (!loading && dataFilter.length > 0) && (
        <table
          className="table table-hover table-dark table-sm align-middle table-bordered"
        >
          <thead>
            <tr className="align-middle">
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
          <tbody>
            {dataFilter.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td><a href={ planet.films }>Films</a></td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td><a href={ planet.url }>Link</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) }
      { (!loading && dataFilter.length === 0)
      && <h2 className="invalid-text">Invalid Search 😭</h2>}
    </section>
  );
}
