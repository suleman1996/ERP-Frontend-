import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Tags from '.';

test('initial button component testing', () => {
  render(<Tags tagsText={['this is tag', 'hi']} />);
  const tag = screen.getByText('this is tag');
  expect(tag).toBeInTheDocument();
});
