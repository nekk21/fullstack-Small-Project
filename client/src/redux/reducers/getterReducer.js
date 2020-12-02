import {
    GET_USER_PROFILE,
    DELETE_COMPANY,
    GET_CARDS_COMPANY,
    GET_USER_IMAGE,
    GET_COMPANY_IMAGES,
} from '../types'

const initialState = {
    userProfileData: [],
    companyData: [],
    cardsCompany: [],
    userProfileImage: null,
    companyImages: {},
    deletedCompany: [],
}

export function getterReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return { ...state, userProfileData: action.payload }

        case GET_USER_IMAGE:
            return { ...state, userProfileImage: action.payload }

        case GET_CARDS_COMPANY:
            return { ...state, cardsCompany: action.payload }

        case GET_COMPANY_IMAGES:
            return { ...state, companyImages: action.payload }

        case DELETE_COMPANY:
            return { ...state, deletedCompany: action.payload }

        default:
            return state
    }
}
