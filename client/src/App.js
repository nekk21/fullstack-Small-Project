import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage'
import ConpanyCreatorPage from './pages/ConpanyCreatorPage'
import UserProfile from './pages/UserProfile'
import ProfileRedactorPage from './pages/ProfileRedactorPage'
import Company from './Components/Company'

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="wrapper">
                    <Switch>
                        <Route component={MainPage} path="/" exact />
                        <Route component={UserPage} path="/UserPage" />
                        <Route component={SignUpPage} path="/SignUp" />
                        <Route
                            component={ConpanyCreatorPage}
                            path="/ConpanyCreatorPage"
                        />
                        <Route component={UserProfile} path="/UserProfile" />
                        <Route
                            component={ProfileRedactorPage}
                            path="/ProfileRedactorPage"
                        />
                        <Route component={Company} path="/Company" />
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App
