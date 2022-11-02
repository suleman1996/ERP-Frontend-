import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from 'components/layout/navbar';

import { store } from 'store';

test('initial EmployeeDropdown component testing', () => {
  render(
    <Router>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </Router>,
  );
  const arrowIcon = screen.getByPlaceholderText('Search');
  expect(arrowIcon).toBeTruthy();
});
