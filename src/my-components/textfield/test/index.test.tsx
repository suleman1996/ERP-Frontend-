import { render, screen } from '@testing-library/react';
import TextField from '..';

test('initial unit testing for checkbox', () => {
  render(<TextField />);
  const textfield = screen.getByRole('textbox');
  expect(textfield).toBeTruthy();
});
