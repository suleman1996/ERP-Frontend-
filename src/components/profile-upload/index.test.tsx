import { render, screen, fireEvent } from '@testing-library/react';
import ProfileUpload from 'components/profile-upload';

test('initial file upload test', () => {
  render(<ProfileUpload />);
  const inputField = screen.getByTestId('fileUpload');
  expect(inputField).toBeTruthy();
});
