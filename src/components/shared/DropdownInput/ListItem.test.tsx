import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListItem from './ListItem';

window.scrollTo = jest.fn();

describe('<ListItem/>', () => {
  test('Renders without error', () => {
    const { getByTestId } = render(
      <ListItem
        onClick={() => undefined}
        value="Value"
      >
        Value
      </ListItem>,
    );

    const item = getByTestId('dropdown-input-list-item');
    expect(item).toBeInTheDocument();
  });

  test('Renders correct value', () => {
    const { getByText } = render(
      <ListItem
        onClick={() => undefined}
        value="Value"
      >
        Value
      </ListItem>,
    );

    const itemValue = getByText('Value');
    expect(itemValue).toBeInTheDocument();
  });

  test('Returns correct value on click callback', () => {
    let returnedValue = '';
    const setReturnedValue = (val: string): void => {
      returnedValue = val;
    };

    const { getByTestId } = render(
      <ListItem
        onClick={setReturnedValue}
        value="Value returned"
      >
        Value
      </ListItem>,
    );

    const item = getByTestId('dropdown-input-list-item');
    userEvent.click(item);

    expect(returnedValue).toBe('Value returned');
  });
});
