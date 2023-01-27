import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function NameFilter() {
  const { setFilterByName } = useContext(Context);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    setFilterByName({ name: nameFilter });
  }, [setFilterByName, nameFilter]);

  return (
    <form className="form-group name-filter-container">
      <label htmlFor="name-filter">
        <input
          type="text"
          data-testid="name-filter"
          value={ nameFilter }
          id="name-filter"
          placeholder="Planet Name"
          onChange={ ({ target }) => setNameFilter(target.value) }
          className="form-control"
        />
      </label>
    </form>
  );
}

export default NameFilter;
