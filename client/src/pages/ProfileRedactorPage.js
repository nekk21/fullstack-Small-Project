import React from 'react'
import Navbar from '../Components/Navbar'
import ProfileRedactorModalRedux from '../Components/ProfileRedactorModal'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, alertMessage } from '../redux/actions/actions'
import Alert from '../Components/Alert'

function ProfileRedactorPage() {
    const dispatch = useDispatch()

    const alertData = useSelector(state => state.items.alert)
    const responseData = useSelector(state => state.fetch.responseUpdateUser)
    const isAuth = useSelector(state => state.items.isAuth)

    let image

    const fileHandler = e => {
        image = e.target.files[0]
        return image
    }

    const onSubmit = formData => {
        const formDataImage = image
        formData.image = formDataImage

        if (
            formData.image &&
            formData.firstName &&
            formData.lastName &&
            formData.position &&
            formData.password &&
            formData.description
        ) {
            formData.isAuth = isAuth
            console.log(formData)
            dispatch(updateProfile(formData))
        } else {
            dispatch(alertMessage('All fields required!!!'))
        }
    }
    console.log(responseData)
    if (responseData.status < 300) {
        return <Redirect to="/UserProfile" />
    }

    if (alertData !== null) {
        return (
            <>
                <Navbar />
                <ProfileRedactorModalRedux
                    onSubmit={onSubmit}
                    fileHandler={fileHandler}
                />
                <Alert />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <ProfileRedactorModalRedux
                onSubmit={onSubmit}
                fileHandler={fileHandler}
            />
        </>
    )
}

export default ProfileRedactorPage
