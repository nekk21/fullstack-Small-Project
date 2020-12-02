import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const StyleForAlert = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    .alert {
        display: flex;
        border: 1px solid;
        width: 40%;
        justify-content: center;
        background: gainsboro;
        border-radius: 4px;
        height: 2rem;
        align-items: center;
    }
`

export default function Alert() {
    const alertData = useSelector(state => state.items.alert)

    return (
        <StyleForAlert className="wrapperAlert">
            <div className="alert">{alertData}</div>
        </StyleForAlert>
    )
}
