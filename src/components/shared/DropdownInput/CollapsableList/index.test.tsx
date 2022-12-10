import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import CollapsableList, { ICollapsableList } from './index';

window.scrollTo = jest.fn();

describe('<CollapsableList/>', () => {
  let value = '';
  const updateValue = (val: string): void => {
    value = val;
  };
  const ref = createRef<ICollapsableList>();

  beforeEach(() => {
    render(
      <CollapsableList
        items={['Item 1', 'Item 2', 'Item 3']}
        onClick={updateValue}
        ref={ref}
      />,
    );
  });

  test('Renders without error', () => {
    const listWrapper = screen.getByTestId('collapsable-list-wrapper');
    expect(listWrapper).toBeInTheDocument();
  });

  test('Renders all items passed', () => {
    const items = screen.getAllByTestId('dropdown-input-list-item');
    expect(items.length).toBe(3);
  });

  test('Set value when click on item inside the list', () => {
    value = '';

    const listItems = screen.getAllByTestId('dropdown-input-list-item');

    userEvent.click(listItems[0]);

    expect(value).toBe('Item 1');
  });

  test('Collapses list when called', () => {
    act(() => ref.current?.onOpen());

    const list = screen.getByTestId('collapsable-list');
    expect(list.getAttribute('data-isopen')).toBe('true');
  });
});
