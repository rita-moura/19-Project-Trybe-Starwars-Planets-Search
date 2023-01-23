import { useContext } from 'react';

const [apiData] = useContext;

export const planetInfos = apiData.filter((key) => delete key.residents);

export const filteredPlanet = planetInfos.filter((planet) => planet.name
  .toLowerCase().includes(valueInput.toLowerCase()));
