import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'

const ProfileRedactorStyle = styled.div`
    .file {
        display: flex;
    }
    .buttons {
        display: flex;
        width: 50%;
        justify-content: flex-end;
        padding-top: 2rem;
    }
    .file-path-wrapper {
        width: 100%;
        display: flex;
    }
    .form_style {
        margin-top: 2rem;
    }
`

function ProfileRedactorModal(props) {
    return (
        <ProfileRedactorStyle>
            <div className="row container ">
                <form
                    onSubmit={props.handleSubmit}
                    className="form_style col s12"
                >
                    <div className="file file-field input-field col s6">
                        <div className="btn waves-effect waves-light #757575 grey darken-1">
                            <span>File</span>
                            <input
                                onChange={props.fileHandler}
                                name="image"
                                type="file"
                                accept=".jpg, .png, .jpeg"
                            />
                        </div>

                        <div className="file-path-wrapper">
                            <Field
                                name="image"
                                component="input"
                                className="file-path validate"
                                type="text"
                                placeholder="Choose Avatar"
                            />
                        </div>
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="firstName"
                            component={'input'}
                            id="FirstName"
                            type="text"
                            className="file-path validate"
                            placeholder="First Name"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="lastName"
                            component={'input'}
                            id="SecondName"
                            type="text"
                            className="validate"
                            placeholder="Second Name"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="position"
                            component={'input'}
                            id="position"
                            type="text"
                            className="validate"
                            placeholder="Position"
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
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="description"
                            component={'textarea'}
                            id="textarea2"
                            type="text"
                            className="materialize-textarea"
                            placeholder="Description"
                            data-length="300"
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
        </ProfileRedactorStyle>
    )
}
const ProfileRedactorModalRedux = reduxForm({ form: 'CreateCompany' })(
    ProfileRedactorModal
)

export default ProfileRedactorModalRedux

// картинка, имя, фамилия, позиция, пароль, описание
