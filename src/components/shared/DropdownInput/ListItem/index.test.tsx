import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListItem from './index';

window.scrollTo = jest.fn();

describe('<ListItem/>', () => {
  let returnedValue = '';
  const setReturnedValue = (val: string): void => {
    returnedValue = val;
  };

  beforeEach(() => {
    render(
      <ListItem
        onClick={setReturnedValue}
        value="Value returned"
      >
        Value
      </ListItem>,
    );
  });

  test('Renders without error', () => {
    const item = screen.getByTestId('dropdown-input-list-item');
    expect(item).toBeInTheDocument();
  });

  test('Renders correct value', () => {
    const itemValue = screen.getByText('Value');
    expect(itemValue).toBeInTheDocument();
  });

  test('Returns correct value on click callback', () => {
    returnedValue = '';

    const item = screen.getByTestId('dropdown-input-list-item');
    userEvent.click(item);

    expect(returnedValue).toBe('Value returned');
  });
});
