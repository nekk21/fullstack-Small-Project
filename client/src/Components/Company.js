import React from 'react'
import Office from '../images/off.png'
import styled from 'styled-components'
import Navbar from './Navbar'

const CompanyStyle = styled.div`
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
`

function Company() {
    // useEffect(() => {
    //     dispatch(fetchGetCompany({ id: companyData.id, isAuth: isAuth }))
    // }, [])

    return (
        <>
            <Navbar />
            <CompanyStyle>
                <div className="wrapper">
                    <div className="imgWrap">
                        <img className="image" src={Office} alt="office"></img>
                    </div>
                    <div>
                        <h1>1</h1>
                        <h3>1</h3>
                        <p>blavladwadawd</p>
                    </div>
                </div>
            </CompanyStyle>
        </>
    )
}

export default Company
