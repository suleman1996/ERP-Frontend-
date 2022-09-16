import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TimePicker from '.';

test('initial button component testing', () => {
  render(<TimePicker name="time picker" placeholder="Enter the time" />);
  const time_picker = screen.getByPlaceholderText('Enter the time');
  expect(time_picker).toBeInTheDocument();
  const time_icon = screen.getByRole('img');
  expect(time_icon).toHaveAttribute('src', 'time-new.svg');
  expect(time_icon).toHaveAttribute('alt', '');
});
