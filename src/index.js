/*

Ce fichier contient le routeur et les templates de base de l'application.

On y à importer tous les composants afin de créer les routes, les routes sont créées en utilisant 'react-router-dom'
Deux routes personnalisée ont été importée, 'PrivateRoute' et 'MailValidationRoute'.

PrivateRoute défini toutes les routes qui ne seront accessible qu'après authentification sur l'application on trouve
la logique de cette route dans le fichier Components/PrivateRoute.js

MailValidationRoute est utilisé pour, comme son nom l'indique, gérer la validation de l'adresse mail, la logique de cette
route se trouve dans le fichier Components/MailValidationRoute.js

En dessous du routeur on trouve une variable nommée "App", cette variable contient la logique de base de l'application :
    - Récupération et stockage des données dans le contexte (React Hooks - Context).
    - Changement du titre des pages.
    - Affichage du bon template.

*/

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import axios from 'axios';

// Import des feuilles de style globale
import './global.scss';
import 'normalize.css';

// Import des routes personnalisées
import {PrivateRoute} from "./Components/PrivateRoute.js";
import {MailValidationRoute} from "./Components/MailValidationRoute.js"

/*
Import du context pour stocker les données et de la fonctione 'useCookies' du package 'react-cookie' afin de récupérer
les cookies nécessaire à l'application
 */
import Context from './Context/Context';
import {useCookies} from 'react-cookie';

// Import des composants et des pages pour le routeur et les templates

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

// Fin de l'import des composants et des pages pour le routeur et les templates

// Import des fonctions définies dans le fichier Auth afin de réaliser les call API
import API from "./utils/Auth";

/*

Définition du routeur.
Le routeur est contenu dans une variable "Root" qui lors du chargement de la page retournera le composant associer à la route.

*/
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

    // URL de l'API
    const burl = "https://api.workandhappiness.fr";

    // Définition des states
    const [user, setUser] = useState([])
    const [entreprise, setEntreprise] = useState([]);
    const [form, setForm] = useState([]);

    // Récupération des cookies
    const [cookies] = useCookies(['_060698', '_031098']);

    /*
        Variable routeType utilisée pour définir le titre de la page, on récupère la dernière partie de l'url.
     */
    let routeType = window.location.pathname.split("/").pop();

    /*
        Fonction qui s'éxecute à chaque rendu si l'utilisateur est connecté
        On sait que l'utilisateur est connecter si le cookie '_060698' est présent.
        Si le call API retourne une ERREUR, dans le cas où le cookie à été altérer par exemple,
        on déconnecte l'utilisateur et supprime tous les cookies nécessaire à l'application.
        Sinon, si le call API ne retourne pas d'erreur on charge les données dans le state pour les envoyer
        dans le contexte ensuite.

        Enfin on se sert de la variable routeType pour savoirsi la route est celle devant afficher le formulaire on
        appelle l'API afin de récupérer le bon formulaire, on le stock dans le state puis on l'envoie au context.
    */
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

    // On défini un objet pour le context contenant nos states
    const contextValue = {
        user,
        entreprise,
        completeForm: form
    }

    // Ici on défini le titre de nos pages en fonction de routeType
    if (routeType !== '') {
        let title = routeType[0].toUpperCase() + routeType.slice(1);
        document.title = `${title} | Work And Happiness`
    } else {
        document.title = `Login | Work And Happiness`
    }

    /*
        On arrive ici sur les "templates".
        Cette partie se compose tout d'abord d'une conditions "Si le cookie '_060698' est présent".

        Voyons d'abord ce qu'il se passe si il est présent, rappelons que si ce cookie est présent c'est que l'utilisateur est connecté.
        Tout d'abord on vérifie si l'utilisateur a validé son adresse mail "if(user.validEmail)" en consultant les données du state "user"
        récupérée grâce à notre appel à l'API.
        Si l'adresse mail à été validée on retourne le template de l'application, sinon on retourne le même template avec
        une section en plus permettant de se rendre à la page de validation de l'adresse mail.
        Dans tous les cas si le cookie est présent le template est entourer de "Context.Provider" afin de pouvoir accéder
        au contexte depuis les composants du template.

        Maintenant si le cookie '_060698' n'est pas présent nous retournons juste le composant Root
    */
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
