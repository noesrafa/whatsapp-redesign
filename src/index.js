import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
)
