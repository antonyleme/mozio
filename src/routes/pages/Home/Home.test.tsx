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

  test('Has logo', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const logo = getByTestId('logo-image');
    expect(logo).toBeInTheDocument();
  });

  test('Has welcome message', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const message = getByTestId('welcome-message');
    expect(message).toBeInTheDocument();
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
