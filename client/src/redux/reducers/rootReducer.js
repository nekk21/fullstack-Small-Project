import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { reducer as formReducer } from 'redux-form'
import { fetchReducer } from './fetchReducer'
import { getterReducer } from './getterReducer'

export const rootReducer = combineReducers({
    items: authReducer,
    form: formReducer,
    fetch: fetchReducer,
    getters: getterReducer,
})
