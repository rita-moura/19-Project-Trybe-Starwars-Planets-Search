import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { INICIAL_STATE_FILTER_NAME } from '../services/InitialState';

export default function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [filterByName, setFilterByName] = useState(INICIAL_STATE_FILTER_NAME);

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then(({ results }) => {
        results.map((planet) => delete planet.residents);
        setData(results);
        setDataFilter(results);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const planetsnameFilter = data
      .filter(({ name }) => name.toUpperCase()
        .includes(filterByName.name.toUpperCase()));
    setDataFilter(planetsnameFilter);
  }, [filterByName, data, setDataFilter]);

  const contextValue = {
    loading,
    data,
    dataFilter,
    setFilterByName,
    filterByName,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;
