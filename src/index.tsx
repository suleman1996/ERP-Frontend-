import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from 'app'

import { NotificationContainer } from 'react-notifications'

import { store } from './store'

import './index.scss'
import 'react-notifications/lib/notifications.css'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
      <NotificationContainer />
    </Provider>
  </Router>,
  document.getElementById('root')
)
