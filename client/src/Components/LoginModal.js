import React from 'react'
import styled from 'styled-components'
import LoginReduxModalChildren from './LoginModalChildren'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../redux/actions/actions'
import { alertMessage } from '../redux/actions/actions'
import Alert from './Alert'
export const LoginModalStyle = styled.div`
    .modalWindow {
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        opacity: 0;
        pointer-events: none;
        transition: 0.5s;
    }

    .modalWindow.active {
        pointer-events: all;
        opacity: 1;
    }

    .modal_content {
        padding: 20px;
        border-radius: 12px;
        background-color: white;

        transform: scale(0.5);
        transition: 0.4s all;

        width: 30vw;
    }

    .modal_content.active {
        transform: scale(1);
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
`

const LoginModal = ({ active, setActive }) => {
    const dispatch = useDispatch()

    const alertData = useSelector(state => state.items.alert)

    const onSubmit = formData => {
        if (formData.password && formData.email) {
            dispatch(fetchLogin(formData))
        } else {
            dispatch(alertMessage('All fields required!!!'))
        }
    }

    if (alertData !== null) {
        return (
            <LoginModalStyle>
                <div
                    className={active ? 'modalWindow active' : 'modalWindow'}
                    onClick={() => setActive(false)}
                >
                    <div
                        className={
                            active ? 'modal_content active' : 'modal_content'
                        }
                        onClick={e => e.stopPropagation()}
                    >
                        <LoginReduxModalChildren onSubmit={onSubmit} />
                        <Alert />
                    </div>
                </div>
            </LoginModalStyle>
        )
    }

    return (
        <LoginModalStyle>
            <div
                className={active ? 'modalWindow active' : 'modalWindow'}
                onClick={() => setActive(false)}
            >
                <div
                    className={
                        active ? 'modal_content active' : 'modal_content'
                    }
                    onClick={e => e.stopPropagation()}
                >
                    <LoginReduxModalChildren onSubmit={onSubmit} />
                </div>
            </div>
        </LoginModalStyle>
    )
}

export default LoginModal
