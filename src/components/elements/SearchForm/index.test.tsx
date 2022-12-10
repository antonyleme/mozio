import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getIfCityIsValid } from 'api';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from '.';

jest.mock('api', () => ({ getIfCityIsValid: jest.fn() }));

describe('<SearchForm/>', () => {
  describe('Renders without errors', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <SearchForm submit={() => undefined} />
        </MemoryRouter>,
      );
    });

    test('Renders without error', () => {
      const form = screen.getByTestId('search-form');
      expect(form).toBeInTheDocument();
    });

    test('Renders 2 icons by default', () => {
      const icons = screen.getAllByTestId('input-icon');
      expect(icons.length).toBe(2);
    });
  });

  describe('Select city inputs', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <SearchForm submit={() => undefined} />
        </MemoryRouter>,
      );
    });

    test('Starts with 2 inputs by default', () => {
      const inputs = screen.getAllByTestId('select-city-input');
      expect(inputs.length).toBe(2);
    });

    test('Doesn`t show remove button when there is less than 3 inputs', () => {
      const removeButtons = screen.queryAllByTestId('select-city-input-remove-button');
      expect(removeButtons.length).toBe(0);
    });

    test('Shows remove button when there is more than 2 inputs', () => {
      const button = screen.getByTestId('add-localization-button');
      userEvent.click(button);

      const removeButtons = screen.getAllByTestId('select-city-input-remove-button');
      expect(removeButtons.length).toBe(3);
    });

    test('Removes one input when click on remove', async () => {
      const button = screen.getByTestId('add-localization-button');
      userEvent.click(button);
      userEvent.click(button);

      const removeButtons = screen.getAllByTestId('select-city-input-remove-button');
      userEvent.click(removeButtons[0]);

      await waitFor(() => {
        const inputs = screen.getAllByTestId('select-city-input');
        expect(inputs.length).toBe(3);
      });
    });
  });

  describe('Add Localization Button', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <SearchForm submit={() => undefined} />
        </MemoryRouter>,
      );
    });

    test('Renders add localization button', () => {
      const button = screen.getByTestId('add-localization-button');
      expect(button).toBeInTheDocument();
    });

    test('Adds one more input when click on button', () => {
      const button = screen.getByTestId('add-localization-button');

      userEvent.click(button);

      const inputs = screen.getAllByTestId('select-city-input');
      expect(inputs.length).toBe(3);
    });
  });

  describe('Search Button', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <SearchForm submit={() => undefined} />
        </MemoryRouter>,
      );
    });

    test('Renders search button', () => {
      const button = screen.getByTestId('search-button');
      expect(button).toBeInTheDocument();
    });

    test('Is disabled when doesnt have cities', () => {
      const button = screen.getByTestId('search-button');
      expect(button).toHaveAttribute('disabled');
    });

    describe('Cities is filled', () => {
      beforeEach(() => {
        const inputs = screen.getAllByTestId('dropdown-input');

        fireEvent.change(inputs[0], { target: { value: 'Paris' } });
        fireEvent.change(inputs[1], { target: { value: 'Reims' } });
      });

      test('Is not disabled when have cities filled', () => {
        const button = screen.getByTestId('search-button');
        expect(button).not.toHaveAttribute('disabled');
      });

      test('Search button gets disabled when submit without date', () => {
        const passengersInput = screen.getByTestId('passengers-input');
        fireEvent.change(passengersInput, { target: { value: 1 } });

        const button = screen.getByTestId('search-button');
        userEvent.click(button);

        expect(button).toHaveAttribute('disabled');
      });

      test('Enables search button after type a date', () => {
        const dateInput = screen.getByTestId('date-input');
        fireEvent.change(dateInput, { target: { value: '2200-10-10' } });

        const passengersInput = screen.getByTestId('passengers-input');
        fireEvent.change(passengersInput, { target: { value: 1 } });

        const button = screen.getByTestId('search-button');

        expect(button).not.toHaveAttribute('disabled');
      });

      describe('Passenger input tests', () => {
        beforeEach(() => {
          const dateInput = screen.getByTestId('date-input');
          fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
        });

        test('Search button gets disabled when submit without passenger', () => {
          const passengersInput = screen.getByTestId('passengers-input');
          fireEvent.change(passengersInput, { target: { value: '' } });

          const button = screen.getByTestId('search-button');
          userEvent.click(button);

          expect(button).toHaveAttribute('disabled');
        });

        test('Enables search button after type a passenger', () => {
          const passengersInput = screen.getByTestId('passengers-input');
          fireEvent.change(passengersInput, { target: { value: '2' } });

          const button = screen.getByTestId('search-button');
          expect(button).not.toHaveAttribute('disabled');
        });
      });
    });
  });

  describe('Valid form submit', () => {
    const handleSubmit = jest.fn();

    beforeEach(() => {
      (getIfCityIsValid as jest.Mock).mockImplementation(() => true);

      render(
        <MemoryRouter>
          <SearchForm
            submit={handleSubmit}
          />
        </MemoryRouter>,
      );

      const dateInput = screen.getByTestId('date-input');
      const passengersInput = screen.getByTestId('passengers-input');
      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '1' } });

      const inputs = screen.getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Valid city 1' } });
      fireEvent.change(inputs[1], { target: { value: 'Valid city 2' } });
    });

    test('Submits when city is valid', async () => {
      const button = await screen.findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalled();
      });
    });

    test('Doesn`t shows invalid when try to submit valid city', async () => {
      const button = await screen.findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      const alerts = screen.queryAllByTestId('dropdown-input-alert');
      expect(alerts.length).toBe(0);
    });
  });

  describe('Invalid form submit', () => {
    const handleSubmit = jest.fn();

    beforeEach(() => {
      (getIfCityIsValid as jest.Mock).mockImplementation(() => false);

      render(
        <MemoryRouter>
          <SearchForm
            submit={handleSubmit}
          />
        </MemoryRouter>,
      );

      const dateInput = screen.getByTestId('date-input');
      const passengersInput = screen.getByTestId('passengers-input');
      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '1' } });

      const inputs = screen.getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Invalid city 1' } });
      fireEvent.change(inputs[1], { target: { value: 'Invalid city 2' } });
    });

    test('Doesn`t submit when city is invalid', async () => {
      const button = await screen.findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });

    test('Shows invalid when try to submit invalid city', async () => {
      const button = await screen.findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      const alerts = await screen.findAllByTestId('dropdown-input-alert');
      expect(alerts.length).toBe(2);
    });
  });
});
