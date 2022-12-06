import {
  fireEvent, render, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getIfCityIsValid } from 'api';
import SearchForm from '.';

jest.mock('api', () => ({ getIfCityIsValid: jest.fn() }));

describe('<SearchForm/>', () => {
  test('Renders without error', () => {
    const { getByTestId } = render(
      <SearchForm submit={() => undefined} />,
    );

    const form = getByTestId('search-form');
    expect(form).toBeInTheDocument();
  });

  test('Renders 2 icons by default', () => {
    const { getAllByTestId } = render(
      <SearchForm submit={() => undefined} />,
    );

    const icons = getAllByTestId('input-icon');
    expect(icons.length).toBe(2);
  });

  describe('Select city inputs', () => {
    test('Starts with 2 inputs by default', () => {
      const { getAllByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const inputs = getAllByTestId('select-city-input');
      expect(inputs.length).toBe(2);
    });

    test('Doesn`t show remove button when there is less than 3 inputs', () => {
      const { queryAllByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const removeButtons = queryAllByTestId('select-city-input-remove-button');
      expect(removeButtons.length).toBe(0);
    });

    test('Shows remove button when there is more than 2 inputs', () => {
      const { getByTestId, getAllByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const button = getByTestId('add-localization-button');
      userEvent.click(button);

      const removeButtons = getAllByTestId('select-city-input-remove-button');
      expect(removeButtons.length).toBe(3);
    });

    test('Removes one input when click on remove', async () => {
      const { getByTestId, getAllByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const button = getByTestId('add-localization-button');
      userEvent.click(button);
      userEvent.click(button);

      const removeButtons = getAllByTestId('select-city-input-remove-button');
      userEvent.click(removeButtons[0]);

      await waitFor(() => {
        const inputs = getAllByTestId('select-city-input');
        expect(inputs.length).toBe(3);
      });
    });
  });

  describe('Add Localization Button', () => {
    test('Renders add localization button', () => {
      const { getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const button = getByTestId('add-localization-button');
      expect(button).toBeInTheDocument();
    });

    test('Adds one more input when click on button', () => {
      const { getByTestId, getAllByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const button = getByTestId('add-localization-button');

      userEvent.click(button);

      const inputs = getAllByTestId('select-city-input');
      expect(inputs.length).toBe(3);
    });
  });

  describe('Search Button', () => {
    test('Renders search button', () => {
      const { getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const button = getByTestId('search-button');
      expect(button).toBeInTheDocument();
    });

    test('Is disabled when doesnt have cities', () => {
      const { getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const button = getByTestId('search-button');
      expect(button).toHaveAttribute('disabled');
    });

    test('Is not disabled when have cities filled', () => {
      const { getAllByTestId, getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const inputs = getAllByTestId('dropdown-input');

      fireEvent.change(inputs[0], { target: { value: 'Paris' } });
      fireEvent.change(inputs[1], { target: { value: 'Reims' } });

      const button = getByTestId('search-button');
      expect(button).not.toHaveAttribute('disabled');
    });

    test('Search button gets disabled when submit without date', () => {
      const { getAllByTestId, getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const passengersInput = getByTestId('passengers-input');

      fireEvent.change(passengersInput, { target: { value: 1 } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Paris' } });
      fireEvent.change(inputs[1], { target: { value: 'Reims' } });

      const button = getByTestId('search-button');
      userEvent.click(button);

      expect(button).toHaveAttribute('disabled');
    });

    test('Enables search button after type a date', () => {
      const { getAllByTestId, getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const dateInput = getByTestId('date-input');
      const passengersInput = getByTestId('passengers-input');

      fireEvent.change(passengersInput, { target: { value: 1 } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Paris' } });
      fireEvent.change(inputs[1], { target: { value: 'Reims' } });

      const button = getByTestId('search-button');
      userEvent.click(button);

      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      expect(button).not.toHaveAttribute('disabled');
    });

    test('Search button gets disabled when submit without passenger', () => {
      const { getAllByTestId, getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const dateInput = getByTestId('date-input');
      const passengersInput = getByTestId('passengers-input');

      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '' } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Paris' } });
      fireEvent.change(inputs[1], { target: { value: 'Reims' } });

      const button = getByTestId('search-button');
      userEvent.click(button);

      expect(button).toHaveAttribute('disabled');
    });

    test('Enables search button after type a passenger', () => {
      const { getAllByTestId, getByTestId } = render(
        <SearchForm submit={() => undefined} />,
      );

      const dateInput = getByTestId('date-input');
      const passengersInput = getByTestId('passengers-input');

      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '' } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Paris' } });
      fireEvent.change(inputs[1], { target: { value: 'Reims' } });

      const button = getByTestId('search-button');
      userEvent.click(button);

      fireEvent.change(passengersInput, { target: { value: '1' } });
      expect(button).not.toHaveAttribute('disabled');
    });
  });

  describe('Valid form submit', () => {
    test('Submits when city is valid', async () => {
      (getIfCityIsValid as jest.Mock).mockImplementation(() => true);
      const handleSubmit = jest.fn();

      const { getByTestId, getAllByTestId, findByTestId } = render(
        <SearchForm
          submit={handleSubmit}
        />,
      );

      const dateInput = getByTestId('date-input');
      const passengersInput = getByTestId('passengers-input');
      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '1' } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Valid city 1' } });
      fireEvent.change(inputs[1], { target: { value: 'Valid city 2' } });

      const button = await findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalled();
      });
    });

    test('Doesn`t shows invalid when try to submit valid city', async () => {
      (getIfCityIsValid as jest.Mock).mockImplementation(() => true);

      const {
        getByTestId, getAllByTestId, findByTestId, queryAllByTestId,
      } = render(
        <SearchForm
          submit={() => undefined}
        />,
      );

      const dateInput = getByTestId('date-input');
      const passengersInput = getByTestId('passengers-input');
      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '1' } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Valid city 1' } });
      fireEvent.change(inputs[1], { target: { value: 'Valid city 2' } });

      const button = await findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      const alerts = queryAllByTestId('dropdown-input-alert');
      expect(alerts.length).toBe(0);
    });
  });

  describe('Invalid form submit', () => {
    test('Doesn`t submit when city is invalid', async () => {
      (getIfCityIsValid as jest.Mock).mockImplementation(() => false);
      const handleSubmit = jest.fn();

      const { getByTestId, getAllByTestId, findByTestId } = render(
        <SearchForm
          submit={handleSubmit}
        />,
      );

      const dateInput = getByTestId('date-input');
      const passengersInput = getByTestId('passengers-input');
      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '1' } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Invalid city 1' } });
      fireEvent.change(inputs[1], { target: { value: 'Invalid city 2' } });

      const button = await findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });

    test('Shows invalid when try to submit invalid city', async () => {
      (getIfCityIsValid as jest.Mock).mockImplementation(() => false);

      const {
        getByTestId, getAllByTestId, findByTestId, findAllByTestId,
      } = render(
        <SearchForm
          submit={() => undefined}
        />,
      );

      const dateInput = getByTestId('date-input');
      const passengersInput = getByTestId('passengers-input');
      fireEvent.change(dateInput, { target: { value: '2200-10-10' } });
      fireEvent.change(passengersInput, { target: { value: '1' } });

      const inputs = getAllByTestId('dropdown-input');
      fireEvent.change(inputs[0], { target: { value: 'Invalid city 1' } });
      fireEvent.change(inputs[1], { target: { value: 'Invalid city 2' } });

      const button = await findByTestId('search-button');

      await waitFor(async () => {
        userEvent.click(button);
      });

      const alerts = await findAllByTestId('dropdown-input-alert');
      expect(alerts.length).toBe(2);
    });
  });
});
