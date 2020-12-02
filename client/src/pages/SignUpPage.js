import React from 'react'
import SignUpReduxModalChildren from '../Components/SignUpModal'
import Navbar from '../Components/Navbar'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, alertMessage } from '../redux/actions/actions'
import Alert from '../Components/Alert'

function SignUpPage() {
    const dispatch = useDispatch()
    const signUp = 'SignUp'

    const alertData = useSelector(state => state.items.alert)
    const isAuth = useSelector(state => state.items.isAuth)

    const onSubmit = formData => {
        if (
            formData.email &&
            formData.password &&
            formData.username &&
            formData.phone
        ) {
            dispatch(fetchRegister(formData))
        } else {
            dispatch(alertMessage('All fields required!!!'))
        }
    }

    if (isAuth) {
        return <Redirect to="/UserPage" />
    }

    if (alertData !== null) {
        return (
            <>
                <Navbar page={signUp} />
                <SignUpReduxModalChildren onSubmit={onSubmit} />
                <Alert />
            </>
        )
    }
    return (
        <>
            <Navbar page={signUp} />
            <SignUpReduxModalChildren onSubmit={onSubmit} />
        </>
    )
}

export default SignUpPage
