import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectCityInput from '.';

describe('<SelectCityInput/>', () => {
  let value = '';
  const updateValue = (val: string): void => {
    value = val;
  };
  const handleRemove = jest.fn();

  describe('With handle remove', () => {
    beforeEach(() => {
      render(
        <SelectCityInput
          value={value}
          onChange={updateValue}
          handleRemove={handleRemove}
          placeholder="Custom placeholder"
        />,
      );
    });

    test('Renders without error', () => {
      const element = screen.getByTestId('select-city-input');
      expect(element).toBeInTheDocument();
    });

    test('Updates state on change correctly', () => {
      value = '';

      const input = screen.getByTestId('dropdown-input');

      fireEvent.change(input, { target: { value: 'Value given' } });
      expect(value).toBe('Value given');
    });

    test('Shows correct placeholder', () => {
      const input = screen.getByPlaceholderText('Custom placeholder');
      expect(input).toBeInTheDocument();
    });

    test('Shows remove button when handleRemove is given', () => {
      const button = screen.getByTestId('select-city-input-remove-button');
      expect(button).toBeInTheDocument();
    });

    test('Calls handle remove when clicked button', () => {
      const button = screen.getByTestId('select-city-input-remove-button');
      userEvent.click(button);

      expect(handleRemove).toHaveBeenCalled();
    });

    test('Hides remove button when not hovered', () => {
      const button = screen.getByTestId('select-city-input-remove-button');

      expect(button).not.toBeVisible();
    });
  });

  describe('Without handle remove', () => {
    test('Doesn`t show remove button when handleRemove is not given', () => {
      render(
        <SelectCityInput
          value={value}
          onChange={updateValue}
        />,
      );

      const button = screen.queryByTestId('select-city-input-remove-button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('With invalid', () => {
    test('Shows is invalid alert when given', () => {
      render(
        <SelectCityInput
          value=""
          onChange={() => undefined}
          handleRemove={() => undefined}
          isInvalid
        />,
      );

      const alert = screen.getByTestId('dropdown-input-alert');
      expect(alert).toBeInTheDocument();
    });
  });
});
