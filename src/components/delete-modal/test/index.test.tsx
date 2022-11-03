import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import DeleteModal from '..';

test('initial button component testing', () => {
  render(<DeleteModal open={true} setOpen={() => false} />);
  const close_icon = screen.getByRole('img');
  expect(close_icon).toHaveAttribute('src', 'delete-cross.svg');
  expect(close_icon).toHaveAttribute('alt', '');

  const button = screen.getAllByRole('button')[0] as HTMLButtonElement;
  expect(button).toBeInTheDocument();
});
