import {
  fireEvent, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownInput from '.';

window.scrollTo = jest.fn();

describe('<DropdownInput/>', () => {
  test('Renders without error', () => {
    render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value="Value"
        loading={false}
        placeholder="Placeholder"
      />,
    );
  });

  test('Shows correctly placeholder', () => {
    const { getByPlaceholderText } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value="Value"
        loading={false}
        placeholder="My test placeholder"
      />,
    );

    const input = getByPlaceholderText('My test placeholder');

    expect(input).toBeInTheDocument();
  });

  test('Shows default value', () => {
    render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value="Value"
        loading={false}
        placeholder="Placeholder"
      />,
    );

    expect(screen.getByDisplayValue('Value')).toBeInTheDocument();
  });

  test('Updates state correctly when changed', async () => {
    let value = 'Default value';
    const updateValue = (val: string): void => {
      value = val;
    };

    const { getByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={updateValue}
        setValue={() => undefined}
        value={value}
        loading={false}
        placeholder="Placeholder"
      />,
    );

    const input = getByTestId('dropdown-input');

    fireEvent.change(input, { target: { value: 'New value' } });

    expect(value).toBe('New value');
  });

  test('Shows spinner when loading is true', () => {
    const { getByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value="Value"
        loading
        placeholder="Placeholder"
      />,
    );

    const spinner = getByTestId('dropdown-input-spinner');

    expect(spinner).toBeInTheDocument();
  });

  test('Doesn`t show spinner when loading is true', () => {
    const { queryByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value="Value"
        loading={false}
        placeholder="Placeholder"
      />,
    );

    const spinner = queryByTestId('dropdown-input-spinner');

    expect(spinner).not.toBeInTheDocument();
  });

  test('Doesn`t show list when not have options', () => {
    const { queryByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value="Value"
        loading={false}
        placeholder="Placeholder"
      />,
    );

    const list = queryByTestId('collapsable-list');
    expect(list).not.toBeVisible();
  });

  test('Set value when click on item inside the list', () => {
    let value = '';
    const updateValue = (val: string): void => {
      value = val;
    };

    const { getByTestId, getAllByTestId } = render(
      <DropdownInput
        options={['Value 1', 'Value 2']}
        onChange={() => undefined}
        setValue={updateValue}
        value={value}
        loading={false}
        placeholder="Placeholder"
      />,
    );

    const input = getByTestId('dropdown-input');
    userEvent.click(input);

    const listItems = getAllByTestId('dropdown-input-list-item');

    userEvent.click(listItems[0]);

    expect(value).toBe('Value 1');
  });

  test('Shows default alert message when invalid', () => {
    const { getByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value=""
        loading={false}
        placeholder="Placeholder"
        isInvalid
      />,
    );

    const alert = getByTestId('dropdown-input-alert');

    expect(alert).toBeInTheDocument();
  });

  test('Shows invalid border when invalid', () => {
    const { getByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value=""
        loading={false}
        placeholder="Placeholder"
        isInvalid
      />,
    );

    const input = getByTestId('dropdown-input');

    expect(window.getComputedStyle(input).borderColor).toBe('red');
  });

  test('Doesn`t shows alert message when not invalid', () => {
    const { queryByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value=""
        loading={false}
        placeholder="Placeholder"
      />,
    );

    const alert = queryByTestId('dropdown-input-alert');

    expect(alert).not.toBeInTheDocument();
  });

  test('Shows correct alert message when sent', () => {
    const { getByTestId } = render(
      <DropdownInput
        options={[]}
        onChange={() => undefined}
        setValue={() => undefined}
        value=""
        loading={false}
        placeholder="Placeholder"
        isInvalid
        invalidMessage="Custom alert message"
      />,
    );

    const alert = getByTestId('dropdown-input-alert');

    expect(alert.textContent).toBe('Custom alert message');
  });
});
