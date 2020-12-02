import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchGetCardsCompany,
    fetchDeleteCompany,
} from '../redux/actions/actions'
import Alert from './Alert'
import styled from 'styled-components'

const StyledCards = styled.div`
    .wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    .each {
        width: 20%;
        margin: 3rem;
    }
    .card:hover {
        transform: scale(1.02);
        transition: 1s;
    }
`

function createUrl(blob) {
    if (!blob) return null
    var urlCreator = window.URL || window.webkitURL
    var imageUrl = urlCreator.createObjectURL(blob)
    return imageUrl
}

function CompanyCards() {
    const dispatch = useDispatch()

    const deleteHandler = formdata => {
        const confirm = window.confirm(
            `Are u sure? You want to delete company - ${formdata.name}?`
        )
        if (confirm) {
            dispatch(fetchDeleteCompany(formdata))
        }
    }

    const alert = useSelector(state => state.items.alert)

    const isAuth = useSelector(state => state.items.isAuth)

    useEffect(() => {
        dispatch(fetchGetCardsCompany({ isAuth: isAuth }))
    }, [])

    const companyCardsData = useSelector(state => state.getters.cardsCompany)
    const companyImages = useSelector(state => state.getters.companyImages)

    if (alert != null) {
        return (
            <StyledCards>
                <div className="wrapper">
                    <Alert />
                </div>
            </StyledCards>
        )
    }

    return (
        <StyledCards>
            <div className="wrapper">
                {companyCardsData.map(company => (
                    <div className="each" key={company.id}>
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img
                                    alt="must be here"
                                    className="activator"
                                    src={createUrl(
                                        companyImages[company.image]
                                    )}
                                />
                            </div>

                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    {company.name}
                                    <i className="material-icons right">
                                        more_vert
                                    </i>
                                </span>
                                <p>
                                    <button
                                        className="btn-small waves-effect waves-light #757575 grey darken-1"
                                        onClick={() =>
                                            deleteHandler({
                                                name: company.name,
                                                isAuth: isAuth,
                                                id: company.id,
                                            })
                                        }
                                    >
                                        Delete company
                                    </button>
                                </p>
                            </div>

                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">
                                    {company.name}
                                    <i className="material-icons right">
                                        close
                                    </i>
                                </span>

                                <p>
                                    <strong> Description:</strong>
                                    {company.description}
                                </p>
                                <p>
                                    <strong>Type:</strong> {company.type}
                                </p>
                                <p>
                                    <strong> Employees:</strong>
                                    {company.numberOfEmployees}
                                </p>
                                <p>
                                    <strong>Service of Activity:</strong>
                                    {company.serviceOfActivity}
                                </p>
                                <p>
                                    <strong>Adress:</strong> {company.adress}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </StyledCards>
    )
}

export default CompanyCards
