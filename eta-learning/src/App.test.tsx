import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows the construction announcement first and dismisses it to reveal the site', () => {
  render(<App />);

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /we’re building something wonderful/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /close announcement/i }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /go to homepage/i })).toBeInTheDocument();
});
