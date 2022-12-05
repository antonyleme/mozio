import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import CollapsableList, { ICollapsableList } from './CollapsableList';

window.scrollTo = jest.fn();

describe('<CollapsableList/>', () => {
  test('Renders without error', () => {
    const { getByTestId } = render(
      <CollapsableList
        items={[]}
        onClick={() => undefined}
      />,
    );

    const listWrapper = getByTestId('collapsable-list-wrapper');
    expect(listWrapper).toBeInTheDocument();
  });

  test('Renders all items passed', () => {
    const { getAllByTestId } = render(
      <CollapsableList
        items={['Item 1', 'Item 2', 'Item 3']}
        onClick={() => undefined}
      />,
    );

    const items = getAllByTestId('dropdown-input-list-item');
    expect(items.length).toBe(3);
  });

  test('Set value when click on item inside the list', () => {
    let value = '';
    const updateValue = (val: string): void => {
      value = val;
    };

    const { getAllByTestId } = render(
      <CollapsableList
        items={['Item 1', 'Item 2', 'Item 3']}
        onClick={updateValue}
      />,
    );

    const listItems = getAllByTestId('dropdown-input-list-item');

    userEvent.click(listItems[0]);

    expect(value).toBe('Item 1');
  });

  test('Collapses list when called', () => {
    const ref = createRef<ICollapsableList>();

    const { getByTestId } = render(
      <CollapsableList
        items={['Item 1', 'Item 2', 'Item 3']}
        onClick={() => undefined}
        ref={ref}
      />,
    );

    act(() => ref.current?.onOpen());

    const list = getByTestId('collapsable-list');
    expect(list.getAttribute('data-isopen')).toBe('true');
  });
});
