import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form'

const StyledModal = styled.div`
    .col {
        width: 50;
    }
    .row {
        padding: 10px;
    }
    .buttons {
        position: relative;
        display: flex;
        padding: 5px;
        justify-content: flex-end;
    }
`

function SignUpModal(props) {
    return (
        <StyledModal>
            <div className="row container ">
                <form
                    onSubmit={props.handleSubmit}
                    className="form_style col s12"
                >
                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="username"
                            component={'input'}
                            id="name"
                            type="text"
                            className="validate"
                            placeholder="Username"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">email</i>
                        <Field
                            name="email"
                            component={'input'}
                            id="email"
                            type="email"
                            className="validate"
                            placeholder="Email"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">security</i>
                        <Field
                            name="password"
                            component={'input'}
                            id="password"
                            type="password"
                            className="validate"
                            placeholder="Password"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">phone</i>
                        <Field
                            placeholder="Telephone"
                            component={'input'}
                            name="phone"
                            id="icon_telephone"
                            type="tel"
                            className="validate"
                        />
                    </div>

                    <div className="buttons">
                        <button
                            type="submit"
                            className="submit btn waves-effect waves-light #757575 grey darken-1"
                        >
                            <i className="material-icons right">send</i>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </StyledModal>
    )
}

const SignUpReduxModalChildren = reduxForm({ form: 'SignUp' })(SignUpModal)

export default SignUpReduxModalChildren
