import React from 'react'
import Navbar from '../Components/Navbar'
import CompanyCreatorModalRedux from '../Components/CompanyCreatorModal'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postCompany, alertMessage } from '../redux/actions/actions'
import Alert from '../Components/Alert'

function ConpanyCreatorPage() {
    const dispatch = useDispatch()

    const alertData = useSelector(state => state.items.alert)
    const responseData = useSelector(state => state.fetch.responsePostCompany)
    const isAuth = useSelector(state => state.items.isAuth)

    let image

    const fileHandler = e => {
        image = e.target.files[0]
        return image
    }

    const onSubmit = formData => {
        const formDataImage = image
        formData.image = formDataImage
        console.log(formData)

        if (
            formData.image &&
            formData.name &&
            formData.address &&
            formData.type &&
            formData.numberOfEmployees &&
            formData.serviceOfActivity &&
            formData.description
        ) {
            formData.isAuth = isAuth
            dispatch(postCompany(formData))
        } else {
            dispatch(alertMessage('All fields required!!!'))
        }
    }

    if (responseData.status < 300) {
        return <Redirect to="/UserPage" />
    }

    if (alertData !== null) {
        return (
            <>
                <Navbar />
                <CompanyCreatorModalRedux
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
            <CompanyCreatorModalRedux
                onSubmit={onSubmit}
                fileHandler={fileHandler}
            />
        </>
    )
}

export default ConpanyCreatorPage
