import {
    LOG_OUT,
    LOG_IN,
    REGISTER,
    HIDE_ALERT_MESSAGE,
    ALERT_MESSAGE,
    POST_COMPANY,
    UPDATE_USER,
    LOGIN_DATA_LOADER,
    GET_USER_PROFILE,
    GET_CARDS_COMPANY,
    DELETE_COMPANY,
    GET_USER_IMAGE,
    GET_COMPANY_IMAGES,
} from '../../redux/types'
import { config } from '../../config'

////////////////////////////////////////////////////LOG IN MEAN IS AUTH = token!
export function logIn(token, rememberMe) {
    return {
        type: LOG_IN,
        payload: { token: token, rememberMe: rememberMe },
    }
}
////////////////////////////////////////////////////////LOG OUT MEAN IS AUTH = null
export function logOut() {
    return {
        type: LOG_OUT,
    }
}
/////////////////////////////////////////////SERVER RESPONSE STATUS FROM LOGIN TO STATE
export function loginDataLoader(data) {
    return {
        type: LOGIN_DATA_LOADER,
        payload: data,
    }
}
////////////////////////////////////////////////////////// LOGIN ACTION
export function fetchLogin(formData) {
    return async dispatch => {
        const response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/user/signin`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const result = await response.json()
        result.status = response.status

        if (result.status < 300) {
            dispatch(logIn(result.token, !!formData.rememberMe))
        } else if (result.status > 300) {
            dispatch(alertMessage('Input data is wrong!')) //result.message
        }

        dispatch(loginDataLoader(result))
    }
}
///////////////////////////////////////////////////////////////////////SIGN IN ACTION
export function fetchRegister(formData) {
    return async dispatch => {
        const response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/user/signup`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        const result = await response.json()
        result.status = response.status

        ////////////////////////////////// DISPATCH LOGIN ACTION WITH SIGN IN
        if (result.status < 300) {
            dispatch(
                fetchLogin({
                    email: result.email,
                    password: formData.password,
                    rememberMe: false,
                })
            )
        } else if (result.status > 300) {
            dispatch(alertMessage(result.message))
        }

        dispatch(register(result))
    }
}
////////////////////////////////////////////////////// SERVER RESPONSE FROM SIGN IN TO STATE
export function register(data) {
    return {
        type: REGISTER,
        payload: data,
    }
}
////////////////////////////////////////////////////WHEN ALERT SOMETHING IN SIGN IN OR LOG IN
export function alertMessage(string) {
    return dispatch => {
        dispatch({
            type: ALERT_MESSAGE,
            payload: string,
        })
        setTimeout(() => {
            dispatch(hidealertMessage())
        }, 3000)
    }
}
///////////////////////////////////////////////HIDE ALERT MESSAGE
export function hidealertMessage() {
    return {
        type: HIDE_ALERT_MESSAGE,
    }
}
////////////////////////////////////////////////////////////CREATE COMPANY
export function postCompany(formData) {
    return async dispatch => {
        const token = formData.isAuth
        let response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/company/company`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (!response.ok) {
            const error = await response.json()
            error.status = response.status
            dispatch(alertMessage(error.message))
            return
        }
        const company = await response.json()
        const fm = new FormData()
        fm.append('image', formData.image)
        fm.append('id', company.id)
        response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/company/logo`,
            {
                method: 'POST',
                body: fm,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (!response.ok) {
            await fetch(
                `${config.API_HOST}:${config.API_PORT}/company/company`,
                {
                    method: 'DELETE',
                    body: JSON.stringify({ id: company.id }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const error = await response.json()
            error.status = response.status
            dispatch(alertMessage(error.message))
            return
        }
        const result = company
        const filename = await response.json()
        result.image = filename.filename
        result.status = response.status
        dispatch(companyRegister(result)) //////////////////// empty yet {}
    }
}
///////////////////////////////////////////////////////////////RESPONSE SERVER ABOUT POST COMPANY
export function companyRegister(data) {
    return {
        type: POST_COMPANY,
        payload: data,
    }
}
/////////////////////////////////////////////////////////////////UPDATE PROFILE WITH IMG
export function updateProfile(formData) {
    return async dispatch => {
        const token = formData.isAuth
        let response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/user/profile`,
            {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (!response.ok) {
            const error = await response.json()
            error.status = response.status
            return dispatch(alertMessage(error.message))
        }
        const user = await response.json()
        const fm = new FormData()
        fm.append('image', formData.image)
        response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/user/avatar`,
            {
                method: 'POST',
                body: fm,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (!response.ok) {
            const error = await response.json()
            error.status = response.status
            return dispatch(alertMessage(error.message))
        }
        const result = user
        const filename = await response.json()
        result.image = filename.filename
        result.status = response.status
        dispatch(userUpdate(result))
    }
}

/////////////////////////////////////////////// SERVER RESPONSE ABOUT UPDATE
export function userUpdate(data) {
    return {
        type: UPDATE_USER,
        payload: data,
    }
}
////////////////////////////////////////////////////////////GETTERS ACTIONS FOR

export function fetchUserProfile(formData) {
    return async dispatch => {
        dispatch(getUserImage(formData))
        const token = formData.isAuth
        const response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/user/profile`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = await response.json()
        data.status = response.status
        dispatch(getUserProfile(data))
    }
}

export function getUserProfile(data) {
    return {
        type: GET_USER_PROFILE,
        payload: data,
    }
}
///////////////////////////////////////////////
export function fetchDeleteCompany(formData) {
    return async dispatch => {
        const token = formData.isAuth
        const response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/company/company/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: formData.id }),
            }
        )
        const data = await response.json()
        dispatch(deleteCompany(data))
        dispatch(fetchGetCardsCompany(formData))
    }
}

export function deleteCompany(data) {
    return {
        type: DELETE_COMPANY,
        payload: data,
    }
}

//////////////////////////////////////////////////
export function fetchGetCardsCompany(formData) {
    return async dispatch => {
        const token = formData.isAuth
        const response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/company/company`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = await response.json()

        if (data.length < 1) {
            dispatch(alertMessage('0 companies yet ('))
        }

        dispatch(getCompanyImages({ companies: data, isAuth: formData.isAuth }))
        dispatch(getCardsCompany(data))
    }
}

export function getCardsCompany(data) {
    return {
        type: GET_CARDS_COMPANY,
        payload: data,
    }
}

export function getUserImage(formData) {
    return async dispatch => {
        const token = formData.isAuth
        const response = await fetch(
            `${config.API_HOST}:${config.API_PORT}/user/avatar`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = await response.blob()
        if (!response.ok) {
            dispatch(alertMessage(data.message))
        }
        dispatch(userImage(data))
    }
}

export function userImage(data) {
    return {
        type: GET_USER_IMAGE,
        payload: data,
    }
}

export function getCompanyImages(formData) {
    return async dispatch => {
        const token = formData.isAuth
        const companyImagesArray = {}
        for (let i = 0; i < formData.companies.length; i++) {
            const response = await fetch(
                `${config.API_HOST}:${config.API_PORT}/company/logo/${formData.companies[i].id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const data = await response.blob()
            companyImagesArray[formData.companies[i].image] = data
            if (!response.ok) {
                dispatch(
                    alertMessage('Something went wrong when loading images')
                )
            }
        }
        dispatch(companyImages(companyImagesArray))
    }
}

export function companyImages(data) {
    return {
        type: GET_COMPANY_IMAGES,
        payload: data,
    }
}
