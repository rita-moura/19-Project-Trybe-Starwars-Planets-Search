import React from 'react';
import { render, screen } from '@testing-library/react';
import Provider from '../context/Provider';
import App from '../App'
import userEvent from '@testing-library/user-event';

describe('Testa se o componente Table funciona corretamente', () => {
  test('Testa se renderiza corretamente as informações', () => {
    render(
      <Provider>
        <App/>
      </Provider>
    )

    const input = screen.getByRole('textbox');
    const selects = screen.getAllByRole('combobox');
    const buttons = screen.getAllByRole('button');
    const inputNumber = screen.getByRole('spinbutton');

    expect(input).toBeInTheDocument();
    expect(selects).toHaveLength(2)
    expect(buttons).toHaveLength(2)
    expect(inputNumber).toBeInTheDocument();

  });
});
