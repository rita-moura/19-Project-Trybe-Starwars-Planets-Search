import React from 'react';
import { render, screen } from '@testing-library/react';
import Provider from '../context/Provider';
import Header from '../components/Header';
import Table from '../components/Table';
import SearchPlanet from '../components/SearchPlanets';

describe('Testa se o componente Table funciona corretamente', () => {
  test('Testa se renderiza corretamente as infrmações', () => {
    render(
      <Provider>
        <Header />
        <SearchPlanet />
        <Table />
      </Provider>
    )
  });

});
