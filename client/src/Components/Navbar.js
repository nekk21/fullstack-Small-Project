import React, { useState } from 'react'
import LoginModal from '../Components/LoginModal'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/actions/actions'

export const NavStyled = styled.div`
    .nav-wrapper {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    .space {
        padding-right: 1.5rem;
        padding-left: 1.5rem;
    }
    .padd {
        padding-left: 1.5rem;
    }
`

function Navbar({ page }) {
    const dispatch = useDispatch()

    const [modalActive, setmodalActive] = useState(false)
    const [secsuess, setSecsuess] = useState(false)
    const [sec, setSec] = useState(false)
    const [secs, setSecs] = useState(false)

    let modal = ''
    let content = ''

    const buttonLogOut = (
        <li className="padd">
            <button
                onClick={() => {
                    dispatch(logOut())
                    setSecs(true)
                }}
                className="btn waves-effect waves-light #757575 grey darken-1"
            >
                Log Out
            </button>
        </li>
    )

    switch (page) {
        case '/':
            modal = (
                <LoginModal active={modalActive} setActive={setmodalActive} />
            )
            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <a
                            href="SignUp"
                            className="register btn waves-effect waves-light #757575 grey darken-1"
                        >
                            Sign Up
                        </a>
                    </li>
                    <li>
                        <button
                            className="btn waves-effect waves-light #757575 grey darken-1"
                            onClick={() => setmodalActive(true)}
                        >
                            Log In
                        </button>
                    </li>
                </ul>
            )

            break

        case '/UserPage':
            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <button
                            className="btn waves-effect waves-light #757575 grey darken-1"
                            onClick={() => setSecsuess(true)}
                        >
                            My Profile
                        </button>
                    </li>
                    {buttonLogOut}
                </ul>
            )
            break
        case '/UserProfile':
            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <button
                            className="btn waves-effect waves-light #757575 grey darken-1"
                            onClick={() => setSec(true)}
                        >
                            To Companies
                        </button>
                    </li>
                    {buttonLogOut}
                </ul>
            )
            break
        default:
            content = ''
    }

    if (secs) {
        return <Redirect to="/" />
    }

    if (sec) {
        return <Redirect to="/UserPage" />
    }

    if (secsuess) {
        return <Redirect to="/UserProfile" />
    }

    return (
        <>
            <NavStyled>
                <nav>
                    <div className="nav-wrapper #bdbdbd grey lighten-1">
                        <Link to="/" className="brand-logo">
                            Company App
                        </Link>

                        {content}
                    </div>
                </nav>
            </NavStyled>
            {modal}
        </>
    )
}

export default Navbar
