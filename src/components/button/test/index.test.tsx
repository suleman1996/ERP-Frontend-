import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Button from 'components/button';

test('initial button component testing', () => {
  const title = 'helo';
  render(<Button text={title} handleClick={() => {}} iconEnd={'test'} />);
  const text = screen.getByText(title);
  expect(text).toBeInTheDocument();
  const button = screen.getAllByRole('button')[0] as HTMLButtonElement;
  expect(button).toBeInTheDocument();
});
