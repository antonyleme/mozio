import { render, screen } from '@testing-library/react';
import Header from '.';

describe('<HomePage/>', () => {
  describe('Children is string', () => {
    beforeEach(() => {
      render(
        <Header>Children</Header>,
      );
    });

    test('Has logo', () => {
      const logo = screen.getByTestId('logo-image');
      expect(logo).toBeInTheDocument();
    });

    test('Renders description', () => {
      const message = screen.getByText('Children');
      expect(message).toBeInTheDocument();
    });
  });

  describe('Children is react element', () => {
    test('Renders description without error when is react element', () => {
      render(
        <Header><strong>React element children</strong></Header>,
      );

      const message = screen.getByText('React element children');
      expect(message).toBeInTheDocument();
    });
  });
});
