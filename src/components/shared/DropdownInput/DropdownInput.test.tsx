import {
  fireEvent, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownInput from '.';

window.scrollTo = jest.fn();

describe('<DropdownInput/>', () => {
  let value = 'Default value';
  const updateValue = (val: string): void => {
    value = val;
  };

  describe('Loading is false, is not invalid and no options', () => {
    beforeEach(() => {
      render(
        <DropdownInput
          options={[]}
          onChange={updateValue}
          setValue={() => undefined}
          value="Value"
          loading={false}
          placeholder="My test placeholder"
        />,
      );
    });
    test('Shows correctly placeholder', () => {
      const input = screen.getByPlaceholderText('My test placeholder');

      expect(input).toBeInTheDocument();
    });

    test('Shows default value', () => {
      expect(screen.getByDisplayValue('Value')).toBeInTheDocument();
    });

    test('Updates state correctly when changed', async () => {
      value = '';

      const input = screen.getByTestId('dropdown-input');

      fireEvent.change(input, { target: { value: 'New value' } });

      expect(value).toBe('New value');
    });

    test('Doesn`t show spinner when loading is false', () => {
      const spinner = screen.queryByTestId('dropdown-input-spinner');

      expect(spinner).not.toBeInTheDocument();
    });

    test('Doesn`t show list when not have options', () => {
      const list = screen.queryByTestId('collapsable-list');
      expect(list).not.toBeVisible();
    });

    test('Doesn`t shows alert message when not invalid', () => {
      const alert = screen.queryByTestId('dropdown-input-alert');

      expect(alert).not.toBeInTheDocument();
    });
  });

  describe('Loading is true', () => {
    beforeEach(() => {
      render(
        <DropdownInput
          options={[]}
          onChange={updateValue}
          setValue={() => undefined}
          value="Value"
          loading
          placeholder="My test placeholder"
        />,
      );
    });

    test('Shows spinner when loading is true', () => {
      const spinner = screen.getByTestId('dropdown-input-spinner');

      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Has options', () => {
    beforeEach(() => {
      render(
        <DropdownInput
          options={['Value 1', 'Value 2']}
          onChange={() => undefined}
          setValue={updateValue}
          value={value}
          loading={false}
          placeholder="Placeholder"
        />,
      );
    });

    test('Set value when click on item inside the list', () => {
      const input = screen.getByTestId('dropdown-input');
      userEvent.click(input);

      const listItems = screen.getAllByTestId('dropdown-input-list-item');

      userEvent.click(listItems[0]);

      expect(value).toBe('Value 1');
    });
  });

  describe('Is invalid', () => {
    beforeEach(() => {
      render(
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
    });

    test('Shows default alert message when invalid', () => {
      const alert = screen.getByTestId('dropdown-input-alert');

      expect(alert).toBeInTheDocument();
    });

    test('Shows invalid border when invalid', () => {
      const input = screen.getByTestId('dropdown-input');

      expect(window.getComputedStyle(input).borderColor).toBe('red');
    });
  });

  describe('Invalid message given', () => {
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
});
