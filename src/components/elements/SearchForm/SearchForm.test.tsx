import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '.';

window.scrollTo = jest.fn();

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
  });
});
