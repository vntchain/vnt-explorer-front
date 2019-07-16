import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import Sirius from 'redux-sirius'
import logger from 'redux-logger'
import {
  ConnectedRouter,
  routerMiddleware as RouterMiddleware
} from 'react-router-redux'
import { createBrowserHistory } from 'history'
// import registerServiceWorker from 'registerServiceWorker'

import App from 'containers/App'
import LangProvider from 'i18n/LangProvider'

import 'normalize.css'
import './index.scss'

const history = createBrowserHistory()
const routerMiddleware = RouterMiddleware(history)

let mode = process.env.NODE_ENV // eslint-disable-line no-undef

let middleware =
  mode === 'development' ? [logger, routerMiddleware] : [routerMiddleware]
const store = new Sirius({
  fileModels: {
    webpackContext: require.context('./models', true, /\.js$/)
  },
  middleware
}).store()

ReactDOM.render(
  <LangProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </LangProvider>,
  document.getElementById('root')
)
// registerServiceWorker()
