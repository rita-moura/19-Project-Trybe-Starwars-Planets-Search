import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  INICIAL_COLUMN_OPTIONS,
  INICIAL_STATE_FILTER_NAME,
  INICIAL_STATE_FILTER_NUMBER,
  INICIAL_STATE_ORDER,
} from '../services/InitialState';
import sortByPopulationASC from '../services/Sort';

export default function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [filterByName, setFilterByName] = useState(INICIAL_STATE_FILTER_NAME);
  const [filterByNumber, setFilterByNumber] = useState(INICIAL_STATE_FILTER_NUMBER);
  const [columnOption, setColumnOption] = useState(INICIAL_COLUMN_OPTIONS);
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState(INICIAL_STATE_ORDER);

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
        .includes(filterByName.name.toUpperCase()))
      .sort(sortByPopulationASC);
    setDataFilter(planetsnameFilter);
  }, [filterByName, data, setDataFilter]);

  const applyFilterOnData = (planetsInfo, array) => array.reduce((acc, curr) => {
    const filterPlanets = acc.filter((planet) => {
      if (curr.comparison === 'maior que') {
        return Number(planet[curr.column]) > Number(curr.value);
      } if (curr.comparison === 'menor que') {
        return Number(planet[curr.column]) < Number(curr.value);
      }
      return Number(planet[curr.column]) === Number(curr.value);
    });
    return filterPlanets;
  }, planetsInfo);

  const handleButtonFilter = (object, setFilterColumn) => {
    const arrayFilter = [...filters, object];
    const arrayPlanetsFilter = applyFilterOnData(dataFilter, arrayFilter);
    const columnOptionFilter = arrayFilter.reduce((acc, curr) => {
      const newAcc = acc.filter((option) => option !== curr.column);
      return newAcc;
    }, columnOption);

    setFilterByNumber(object);
    setColumnOption(columnOptionFilter);
    setFilters(arrayFilter);
    setDataFilter(arrayPlanetsFilter);
    setFilterColumn(columnOptionFilter[0]);
  };

  const handleRemoveFilter = (option) => {
    const filtersChange = filters.filter((filter) => filter !== option);
    setFilters(filtersChange);
    setColumnOption([...columnOption, option.column]);

    const dataInput = data
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()))
      .sort(sortByPopulationASC);
    const updateDataFilter = applyFilterOnData(dataInput, filtersChange);
    setDataFilter(updateDataFilter);
  };

  const handleRemoveAllFilters = () => {
    setFilters([]);
    setColumnOption(INICIAL_COLUMN_OPTIONS);

    const dataInput = data
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()))
      .sort(sortByPopulationASC);
    const updateDataFilter = applyFilterOnData(dataInput, []);
    setDataFilter(updateDataFilter);
  };

  const splitDataWithUnknown = (column) => [...dataFilter].reduce((acc, curr) => {
    if (curr[column] === 'unknown') {
      acc.arrayString.push(curr);
      return acc;
    }
    acc.arrayNumber.push(curr);
    return acc;
  }, {
    arrayString: [],
    arrayNumber: [],
  });

  const orderDataFilterBySort = (arrayNumber, arrayString, { column, sort }) => {
    console.log('array de numero', arrayNumber);
    console.log('array de unkdown', arrayString);
    console.log(column);
    if (sort === 'ASC') {
      return [
        ...arrayNumber.sort((a, b) => a[column] - b[column]),
        ...arrayString,
      ];
    }
    if (sort === 'DESC') {
      return [
        ...arrayNumber.sort((a, b) => b[column] - a[column]),
        ...arrayString,
      ];
    }
  };

  const handleSort = (object) => {
    setOrder(object);
    const { column } = object;
    const { arrayNumber, arrayString } = splitDataWithUnknown(column);
    const sortedArrayData = orderDataFilterBySort(arrayNumber, arrayString, object);
    setDataFilter(sortedArrayData);
  };

  const contextValue = {
    data,
    filters,
    order,
    loading,
    dataFilter,
    columnOption,
    filterByName,
    filterByNumber,
    handleSort,
    setFilterByName,
    handleButtonFilter,
    handleRemoveFilter,
    handleRemoveAllFilters,
    orderDataFilterBySort,
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
