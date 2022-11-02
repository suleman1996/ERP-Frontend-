import React from 'react';
import { render, screen } from '@testing-library/react';

import TextArea from 'components/textarea';

test('initial unit testing for checkbox', () => {
  render(<TextArea name="textarea" label="textarea" />);
  const textarea = screen.getByRole('textbox');
  expect(textarea).toBeTruthy();
});
