import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'

const CompantModalStyle = styled.div`
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

function CompanyCreatorModal(props) {
    return (
        <CompantModalStyle>
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
                                placeholder="Choose Company Image"
                            />
                        </div>
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="name"
                            component={'input'}
                            id="CompanyName"
                            type="text"
                            className="file-path validate"
                            placeholder="Company Name"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="address"
                            component={'input'}
                            id="Adress"
                            type="text"
                            className="validate"
                            placeholder="Company Adress"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="serviceOfActivity"
                            component={'input'}
                            id="ServiceOfActivity"
                            type="text"
                            className="validate"
                            placeholder="Service Of Activity"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="type"
                            component={'input'}
                            id="CompanyType"
                            type="text"
                            className="validate"
                            placeholder="Company Type"
                        />
                    </div>

                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <Field
                            name="numberOfEmployees"
                            component={'input'}
                            id="numberOfEmployees"
                            type="number"
                            className="validate"
                            placeholder="Number Of Employees"
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
        </CompantModalStyle>
    )
}
const CompanyCreatorModalRedux = reduxForm({ form: 'CreateCompany' })(
    CompanyCreatorModal
)

export default CompanyCreatorModalRedux

// Картинка, адресс, вид деятельности, описание, тип компании, колво-работников
