import React, { useState, useEffect } from 'react'
import Office from '../images/off.png'
import Navbar from '../Components/Navbar'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../redux/actions/actions'

const UserProfileStyle = styled.div`
    .imgWrap {
        margin-right: 10rem;
    }
    .wrapper {
        margin: 3rem;
        display: flex;
    }
    .image {
        width: 400px;
    }
    h1 {
        display: contents;
    }
    .button {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
    .userData {
        width: 100%;
    }
`

function createUrl(blob) {
    if (!blob) return null
    var urlCreator = window.URL || window.webkitURL
    var imageUrl = urlCreator.createObjectURL(blob)
    return imageUrl
}

function UserProfile() {
    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.items.isAuth)

    useEffect(() => {
        dispatch(fetchUserProfile({ isAuth: isAuth }))
    }, [])

    const userData = useSelector(state => state.getters.userProfileData)
    const userImage = useSelector(state => state.getters.userProfileImage)

    console.log(userData)
    console.log(userImage)

    const [sec, setSec] = useState(false)

    if (sec) {
        return <Redirect to="/ProfileRedactorPage" />
    }

    return (
        <UserProfileStyle>
            <Navbar page="/UserProfile" />
            <div className="wrapper">
                <div className="imgWrap">
                    <img
                        className="image"
                        src={createUrl(userImage)}
                        alt="office"
                    ></img>
                </div>
                <div className="userData">
                    <h1>Username : {userData.username} </h1>
                    <h3>Email: {userData.email}</h3>
                    <h4>First Name: {userData.firstName} </h4>
                    <h4>Last Name: {userData.lastName} </h4>
                    <p>Position: {userData.position} </p>
                    <p>Description: {userData.phoneNumber} </p>
                    <p>Phone: {userData.description} </p>
                </div>

                <div className="button">
                    <button
                        className="submit btn waves-effect waves-light #757575 grey darken-1"
                        onClick={() => setSec(true)}
                    >
                        Edit profile
                    </button>
                </div>
            </div>
        </UserProfileStyle>
    )
}

export default UserProfile
