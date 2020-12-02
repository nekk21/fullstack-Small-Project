import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'

import App from './App'

import { rootReducer } from './redux/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reportWebVitals from './reportWebVitals'

import reduxCookiesMiddleware from 'redux-cookies-middleware'
import Cookies from 'js-cookie'
//import { getStateFromCookies } from 'redux-cookies-middleware'

const paths = {
    'items.isAuth': { name: 'auth_token' },
    'items.rememberMe': { name: 'rememberMe' },
}

const setCookie = (name, value, expiry, secure) => {
    //const state = getStateFromCookies({}, paths)
    Cookies.set(name, value, {
        expires: 2 / 24, //state.items.rememberMe ? 2 / 24 : undefined,
        secure: secure,
    })
}

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunk,
            reduxCookiesMiddleware(paths, { setCookie: setCookie })
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
