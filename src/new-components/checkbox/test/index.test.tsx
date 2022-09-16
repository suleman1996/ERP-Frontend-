import React from 'react';
import { render, screen } from '@testing-library/react';

import Checkbox from 'components/checkbox';

test('initial unit testing for checkbox', () => {
  render(<Checkbox />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeTruthy();
});
