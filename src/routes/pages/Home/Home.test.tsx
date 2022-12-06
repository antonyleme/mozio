import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '.';

describe('<HomePage/>', () => {
  test('Renders without error', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  });

  test('Has header', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const header = getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('Has search form', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const form = getByTestId('search-form');
    expect(form).toBeInTheDocument();
  });
});
