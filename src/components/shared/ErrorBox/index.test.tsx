import { render, screen } from '@testing-library/react';
import ErrorBox from '.';

describe('<HomePage/>', () => {
  describe('Children is string', () => {
    beforeEach(() => {
      render(
        <ErrorBox>Children</ErrorBox>,
      );
    });

    test('Renders children when is string', () => {
      const message = screen.getByText('Children');
      expect(message).toBeInTheDocument();
    });
  });

  describe('Children is react element', () => {
    test('Renders children without error when is react element', () => {
      render(
        <ErrorBox><strong>React element children</strong></ErrorBox>,
      );

      const message = screen.getByText('React element children');
      expect(message).toBeInTheDocument();
    });
  });
});
