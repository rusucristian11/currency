import React from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import Header from "./Components/Header/Header";
import Homepage from "./Homepage/Homepage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import './App.scss';

function App() {
    return (
        <React.Fragment>
            <Router>
                <Route component={Header}/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    // 404
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
