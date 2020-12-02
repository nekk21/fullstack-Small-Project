import { POST_COMPANY, REGISTER, UPDATE_USER } from '../types'

const initialState = {
    responseRegisterData: {},
    responsePostCompany: {},
    responseUpdateUser: {},
}

export const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                responseRegisterData: action.payload,
            }

        case POST_COMPANY:
            return {
                ...state,
                responsePostCompany: action.payload,
            }
        case UPDATE_USER:
            return {
                ...state,
                responseUpdateUser: action.payload,
            }

        default:
            return state
    }
}
