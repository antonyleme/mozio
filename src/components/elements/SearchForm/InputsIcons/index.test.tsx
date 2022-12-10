import { render, screen } from '@testing-library/react';
import InputsIcons from './index';

describe('<InputsIcons/>', () => {
  describe('Index 0', () => {
    beforeEach(() => {
      render(
        <InputsIcons size={2} index={0} />,
      );
    });

    test('Renders without error', () => {
      const icon = screen.getByTestId('input-icon');
      expect(icon).toBeInTheDocument();
    });

    test('Renders correct icon when index !== size -1', () => {
      const icon = screen.getByTestId('position-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Index 1', () => {
    beforeEach(() => {
      render(
        <InputsIcons size={2} index={1} />,
      );
    });

    test('Renders correct icon when index === size -1', () => {
      const icon = screen.getByTestId('pin-icon');
      expect(icon).toBeInTheDocument();
    });
  });
});
