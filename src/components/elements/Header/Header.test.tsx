import { render } from '@testing-library/react';
import Header from '.';

describe('<HomePage/>', () => {
  test('Renders without error', () => {
    render(
      <Header>Children</Header>,
    );
  });

  test('Has logo', () => {
    const { getByTestId } = render(
      <Header>Children</Header>,
    );

    const logo = getByTestId('logo-image');
    expect(logo).toBeInTheDocument();
  });

  test('Renders description', () => {
    const { getByText } = render(
      <Header>Children</Header>,
    );

    const message = getByText('Children');
    expect(message).toBeInTheDocument();
  });

  test('Renders description without error when is react element', () => {
    const { getByText } = render(
      <Header><strong>React element children</strong></Header>,
    );

    const message = getByText('React element children');
    expect(message).toBeInTheDocument();
  });
});
