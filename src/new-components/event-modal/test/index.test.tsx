import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Modal from 'new-components/modal';

test('initial button component testing', () => {
  render(
    <Modal
      open={true}
      children={'done'}
      text={'dfdd'}
      handleClick={() => console.log('first')}
      handleClose={() => console.log('ddf')}
    />,
  );
  const logo = screen.getByRole('img');
  expect(logo).toHaveAttribute('src', 'cross.svg');
  expect(logo).toHaveAttribute('alt', 'close icon');

  const button = screen.getAllByRole('button')[0] as HTMLButtonElement;
  expect(button).toBeInTheDocument();
});
