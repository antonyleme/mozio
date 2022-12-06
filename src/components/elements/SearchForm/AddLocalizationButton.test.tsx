import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddLocalizationButton from './AddLocalizationButton';

describe('<AddLocalizationButton/>', () => {
  test('Renders without error', () => {
    const { getByTestId } = render(
      <AddLocalizationButton onClick={() => undefined} />,
    );

    const button = getByTestId('add-localization-button');
    expect(button).toBeInTheDocument();
  });

  test('Calls onClick when clicked', () => {
    const handeClick = jest.fn();

    const { getByTestId } = render(
      <AddLocalizationButton onClick={handeClick} />,
    );

    const button = getByTestId('add-localization-button');
    userEvent.click(button);
    expect(handeClick).toHaveBeenCalled();
  });
});
