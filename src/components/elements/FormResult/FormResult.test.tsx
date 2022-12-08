import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FormResult from '.';

describe('<FormResult/>', () => {
  describe('Renders one result', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <FormResult
            date="2200-10-10"
            passengers="2"
            distances={[
              {
                cities: ['Paris', 'Nyce'],
                distance: 500000,
              },
            ]}
          />
        </MemoryRouter>,
      );
    });

    test('Shows correct date', () => {
      expect(screen.getByDisplayValue('2200-10-10')).toBeInTheDocument();
    });

    test('Shows correct passengers number', () => {
      expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    });

    test('Renders correct cities', () => {
      const paris = screen.getByText('Paris');
      const nyce = screen.getByText('Nyce');

      expect(paris).toBeInTheDocument();
      expect(nyce).toBeInTheDocument();
    });

    test('Renders correct relative distance', () => {
      const distance = screen.getByTestId('distance-value');
      expect(distance.textContent).toBe('500km');
    });
  });

  describe('Renders two results', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <FormResult
            date="2200-10-10"
            passengers="2"
            distances={[
              {
                cities: ['Paris', 'Nyce'],
                distance: 500000,
              },
              {
                cities: ['Nyce', 'Paris'],
                distance: 500000,
              },
            ]}
          />
        </MemoryRouter>,
      );
    });

    test('Renders correct total', () => {
      const distance = screen.getByTestId('total-distance-value');
      expect(distance.textContent).toBe('1000km');
    });
  });
});
