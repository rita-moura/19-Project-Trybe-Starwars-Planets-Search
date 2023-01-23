import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const FetchProvider = createContext();

function FetchContext({ children }) {
  const [apiData, setApiData] = useState([]);
  const fetchApiPlanets = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    setApiData(data.results);
  };

  const contextValue = useMemo(() => ({
    apiData,
    fetchApiPlanets,
  }), [apiData]);

  return (
    <FetchContext.Provider value={ contextValue }>
      {children}
    </FetchContext.Provider>
  );
}

export default FetchContext;

FetchContext.propTypes = {
  children: PropTypes.object,
}.isrequired;
