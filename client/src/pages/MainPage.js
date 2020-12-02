import React from 'react'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

function MainPage() {
    const main = '/'
    const isAuth = useSelector(state => state.items.isAuth)

    if (isAuth) {
        return <Redirect to="/UserPage" />
    }

    return (
        <>
            <Navbar page={main} />
        </>
    )
}

export default MainPage
