import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageUpload from '.';

test('initial test image upload', () => {
  render(<ImageUpload />);

  const dropYourFile = screen.getByText('Drop your file here or');
  const selectFileText = screen.getByText('Select a file');
  const imgTypeText = screen.getByText('Only JPEG, JPG or PNG Files are allowed upto 3 MB in size');
  expect(dropYourFile).toBeInTheDocument();
  expect(selectFileText).toBeInTheDocument();
  expect(imgTypeText).toBeInTheDocument();

  const imgIcon = screen.getByRole('img');
  expect(imgIcon).toHaveAttribute('src', 'camIcon.png');

  const clickable = screen.getByTestId('wraper');
  fireEvent.click(clickable);
});
