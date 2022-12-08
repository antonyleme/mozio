import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '.';

describe('<HomePage/>', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  });

  test('Has header', () => {
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('Has search form', () => {
    const form = screen.getByTestId('search-form');
    expect(form).toBeInTheDocument();
  });
});
