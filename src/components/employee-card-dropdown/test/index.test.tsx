import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EmployeeDropdown from '..';

test('initial EmployeeDropdown component testing', () => {
  render(<EmployeeDropdown />);
  const arrowIcon = screen.getAllByRole('img');
  expect(arrowIcon).toBeTruthy();
  expect(arrowIcon).toHaveAttribute('src', 'arrow-left.svg');
  expect(arrowIcon).toHaveAttribute('alt', '');
});
