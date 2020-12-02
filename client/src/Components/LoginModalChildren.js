import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { LoginModalStyle } from './LoginModal'

const LoginModalChildren = props => {
    return (
        <LoginModalStyle>
            <div>
                <form
                    onSubmit={props.handleSubmit}
                    className="form_style col s12"
                >
                    <div className="input-field col s12">
                        <Field
                            name="email"
                            component={'input'}
                            id="email"
                            type="email"
                            className="validate"
                            placeholder="Email"
                        />
                    </div>

                    <div className="input-field col s12">
                        <Field
                            name="password"
                            component={'input'}
                            id="password"
                            type="password"
                            className="validate"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <p>
                            <label>
                                <Field
                                    name="rememberMe"
                                    component="input"
                                    type="checkbox"
                                />
                                <span>Remember me</span>
                            </label>
                        </p>
                    </div>

                    <div className="buttons">
                        <a
                            href="SignUp"
                            className="register btn waves-effect waves-light #757575 grey darken-1"
                        >
                            Sign Up
                        </a>

                        <button
                            type="submit"
                            className="submit btn waves-effect waves-light #757575 grey darken-1"
                        >
                            <i className="material-icons right ">send</i>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </LoginModalStyle>
    )
}
const LoginReduxModalChildren = reduxForm({ form: 'login' })(LoginModalChildren)

export default LoginReduxModalChildren
