import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectCityInput from '.';

describe('<SelectCityInput/>', () => {
  test('Renders without error', () => {
    const { getByTestId } = render(
      <SelectCityInput
        value=""
        onChange={() => undefined}
      />,
    );

    const element = getByTestId('select-city-input');
    expect(element).toBeInTheDocument();
  });

  test('Updates state on change correctly', () => {
    let value = '';
    const updateValue = (val: string): void => {
      value = val;
    };

    const { getByTestId } = render(
      <SelectCityInput
        value={value}
        onChange={updateValue}
      />,
    );

    const input = getByTestId('dropdown-input');

    fireEvent.change(input, { target: { value: 'Value given' } });
    expect(value).toBe('Value given');
  });

  test('Shows correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <SelectCityInput
        value=""
        onChange={() => undefined}
        placeholder="Custom placeholder"
      />,
    );

    const input = getByPlaceholderText('Custom placeholder');
    expect(input).toBeInTheDocument();
  });

  test('Shows remove button when handleRemove is given', () => {
    const { getByTestId } = render(
      <SelectCityInput
        value=""
        onChange={() => undefined}
        handleRemove={() => undefined}
      />,
    );

    const button = getByTestId('select-city-input-remove-button');
    expect(button).toBeInTheDocument();
  });

  test('Calls handle remove when clicked button', () => {
    let called = false;
    const handleRemove = (): void => {
      called = true;
    };

    const { getByTestId } = render(
      <SelectCityInput
        value=""
        onChange={() => undefined}
        handleRemove={handleRemove}
      />,
    );

    const button = getByTestId('select-city-input-remove-button');
    userEvent.click(button);

    expect(called).toBeTruthy();
  });

  test('Hides remove button when not hovered', () => {
    const { getByTestId } = render(
      <SelectCityInput
        value=""
        onChange={() => undefined}
        handleRemove={() => undefined}
      />,
    );

    const button = getByTestId('select-city-input-remove-button');

    expect(button).not.toBeVisible();
  });

  test('Shows is invalid alert when given', () => {
    const { getByTestId } = render(
      <SelectCityInput
        value=""
        onChange={() => undefined}
        handleRemove={() => undefined}
        isInvalid
      />,
    );

    const alert = getByTestId('dropdown-input-alert');
    expect(alert).toBeInTheDocument();
  });
});
