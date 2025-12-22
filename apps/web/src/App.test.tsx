// @ts-nocheck
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  const linkElement = screen.getByText(/narisangha/i);
  expect(linkElement).toBeInTheDocument();
});


