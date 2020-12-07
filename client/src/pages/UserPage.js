import React, { useState } from 'react'
import CompanyCards from '../Components/CompanyCards'
import Navbar from '../Components/Navbar'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { hidealertMessage } from '../redux/actions/actions'

const StyledUserPage = styled.div`
    .myButon {
        margin: 20px;
        display: flex;
        justify-content: flex-end;
    }
`

function UserPage() {
    const [secsuess, setSecsuess] = useState(false)
    const dispatch = useDispatch()

    if (secsuess) {
        return <Redirect to="/ConpanyCreatorPage" />
    }
    return (
        <StyledUserPage>
            <Navbar page={'/UserPage'} />
            <div className="myButon">
                <button
                    className="btn waves-effect waves-light #757575 grey darken-1"
                    onClick={() => {
                        dispatch(hidealertMessage())
                        setSecsuess(true)
                    }}
                >
                    <i className="material-icons right">work</i>
                    Add Company
                </button>
            </div>
            <div className="cards">
                <CompanyCards />
            </div>
        </StyledUserPage>
    )
}

export default UserPage
