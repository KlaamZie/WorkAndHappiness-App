import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './global.scss';

import {PrivateRoute} from "./Components/PrivateRoute.js";
import {MailValidationRoute} from "./Components/MailValidationRoute.js"

import Context from './Context/Context';
import {useCookies} from 'react-cookie';

import 'normalize.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar';
import Sidenav from './Components/Sidenav/Sidenav';
import Footer from './Components/Footer/Footer';
import NoMatchPage from "./Components/404/404";

import Login from './Components/Auth/Login/Login';
import Signup from './Components/Auth/Signup/Signup';
import ForgotPassword from './Components/Auth/ForgotPassword/ForgotPassword';

import Params from './Components/Params/Params';

import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import MailValidation from './Components/MailValidation/MailValidation';

import Form from './Components/Form/Form';

import Admin from './Components/Admin/Admin';

import API from "./utils/Auth";

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/signup' component={Signup}/>
            <Route exact path='/forgotpassword' component={ForgotPassword}/>
            <PrivateRoute exact path='/home' component={Home}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/params" component={Params}/>
            <MailValidationRoute exact path="/validemail" component={MailValidation}/>
            <PrivateRoute exact path="/form" component={Form}/>
            <PrivateRoute exact path="/admin" component={Admin}/>
            <Route component={NoMatchPage}/>
        </Switch>
    </Router>
)

const App = () => {

    const burl = "https://api.workandhappiness.fr";

    const [user, setUser] = useState([])
    const [entreprise, setEntreprise] = useState([]);
    const [form, setForm] = useState([]);
    const [cookies] = useCookies(['_060698', '_031098']);

    let routeType = window.location.pathname.split("/").pop();

    useEffect(() => {
        if (cookies._060698) {

            let authorization = 'Bearer ' + cookies._060698;
            let refresh = cookies._031098;
            axios.get(`${burl}/getinfos`, {headers: {Authorization: authorization, Refresh: refresh}})
                .then(response => {
                    setUser(response.data.user);
                    setEntreprise(response.data.entreprise);
                })
                .catch((error) => {
                    API.logout();
                    document.cookie = "_060698=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
                    document.cookie = "_031098=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
                    window.location = "/";
                    console.log(error);
                });

            if (routeType === 'form') {
                axios.get(`${burl}/getform`, {headers: {Authorization: authorization, Refresh: refresh}})
                    .then(response => {
                        setForm(response.data.form);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [cookies._060698, cookies._031098, form.length, routeType])

    const contextValue = {
        user,
        entreprise,
        completeForm: form
    }

    if (routeType !== '') {
        let title = routeType[0].toUpperCase() + routeType.slice(1);
        document.title = `${title} | Work And Happiness`
    } else {
        document.title = `Login | Work And Happiness`
    }

    if (cookies._060698) {
        if (user.validEmail) {
            return (
                <Context.Provider value={contextValue}>
                    <div className="container">
                        <Sidenav/>
                        <div id="wrapper">
                            <Navbar/>
                            <Root/>
                            <Footer/>
                        </div>
                    </div>
                </Context.Provider>
            )
        } else {
            return (
                <Context.Provider value={contextValue}>
                    <div className="validEmail">
                        <p>Vous n'avez pas encore validé votre adresse mail !</p>
                        <p><a href="/validemail">Cliquez ici pour la valider maintenant !</a></p>
                    </div>
                    <div className="container">
                        <Sidenav/>
                        <div id="wrapper">
                            <Navbar/>
                            <Root/>
                            <Footer/>
                        </div>
                    </div>
                </Context.Provider>
            )
        }
    } else {
        return (
            <Root/>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
