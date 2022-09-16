import React from 'react';
import { render, screen } from '@testing-library/react';

import Radio from 'components/radio';

test('initial unit testing for checkbox', () => {
  render(<Radio />);
  const radio = screen.getByRole('radio');
  expect(radio).toBeTruthy();
});
