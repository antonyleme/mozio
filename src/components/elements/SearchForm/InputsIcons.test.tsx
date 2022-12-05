import { render } from '@testing-library/react';
import InputsIcons from './InputsIcons';

window.scrollTo = jest.fn();

describe('<InputsIcons/>', () => {
  test('Renders without error', () => {
    const { getByTestId } = render(
      <InputsIcons size={2} index={0} />,
    );

    const icon = getByTestId('input-icon');
    expect(icon).toBeInTheDocument();
  });

  test('Renders correct icon when index !== size -1', () => {
    const { getByTestId } = render(
      <InputsIcons size={2} index={0} />,
    );

    const icon = getByTestId('position-icon');
    expect(icon).toBeInTheDocument();
  });

  test('Renders correct icon when index === size -1', () => {
    const { getByTestId } = render(
      <InputsIcons size={2} index={1} />,
    );

    const icon = getByTestId('pin-icon');
    expect(icon).toBeInTheDocument();
  });
});
