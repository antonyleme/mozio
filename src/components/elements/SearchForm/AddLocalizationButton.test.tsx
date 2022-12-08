import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddLocalizationButton from './AddLocalizationButton';

describe('<AddLocalizationButton/>', () => {
  const handeClick = jest.fn();
  beforeEach(() => {
    render(
      <AddLocalizationButton onClick={handeClick} />,
    );
  });
  test('Renders without error', () => {
    const button = screen.getByTestId('add-localization-button');
    expect(button).toBeInTheDocument();
  });

  test('Calls onClick when clicked', () => {
    const button = screen.getByTestId('add-localization-button');
    userEvent.click(button);
    expect(handeClick).toHaveBeenCalled();
  });
});
