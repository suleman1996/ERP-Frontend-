import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from '.';

import { store } from 'store';

test('initial button component testing', async () => {
  render(
    <Router>
      <Provider store={store}>
        <Sidebar setOpen={(prev) => !prev} />
      </Provider>
    </Router>,
  );
  let collapse_icon = screen.getByTestId('openClose');
  expect(collapse_icon).toHaveAttribute('alt', '!error');
  expect(collapse_icon).toHaveAttribute('src', 'sidebar-icon.svg');

  // please approve this commented code

  // user.click(collapse_icon);
  // waitFor(()=>{},{

  // })
  // collapse_icon = await screen.find('openClose');

  // fireEvent.click(collapse_icon);

  // expect(collapse_icon).toHaveAttribute('src', 'right.svg');
  //   fireEvent.click(collapse_icon);
  //   expect(collapse_icon).toHaveAttribute('src', 'sidebar-icon.svg');

  //   expect(logo).toHaveAttribute('src', 'right.svg');

  //   const button = screen.getAllByRole('button')[0] as HTMLButtonElement;
  //   expect(button).toBeInTheDocument();
});
