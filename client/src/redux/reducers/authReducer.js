import { LOG_OUT, LOG_IN, ALERT_MESSAGE, HIDE_ALERT_MESSAGE } from '../types'
import { getStateFromCookies } from 'redux-cookies-middleware'

const paths = {
    isAuth: { name: 'auth_token' },
    rememberMe: { name: 'rememberMe' },
}

let initialState = {
    isAuth: null,
    alert: null,
    rememberMe: false,
}

initialState = getStateFromCookies(initialState, paths)

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isAuth: action.payload.token,
                rememberMe: action.payload.rememberMe,
            }
        }
        case LOG_OUT: {
            return { ...state, isAuth: null, rememberMe: false }
        }
        case ALERT_MESSAGE:
            return { ...state, alert: action.payload }

        case HIDE_ALERT_MESSAGE: {
            return { ...state, alert: null }
        }
        default:
            return state
    }
}
