/*
    Ce composant gère toute la partie dédiée à la connexion d'un utilisateur.
    Pour se connecter l'utilisateur doit remplir 2 champs (adresse mail et mot de passe) une fois validé on appelle
    l'API pour vérifier si l'adresse email correspond bien à un compte et si le mot de passe est le bon.
    Nous le verrons plus loin mais l'utilisateur à la possibilité de préciser qu'il souhaite rester connecter.
*/

import React, {useState} from "react";
import { Redirect } from "react-router-dom"
import {useCookies} from 'react-cookie';
import API from "../../../utils/Auth";
import '../Auth.scss';
import './Login.scss';

export default function Login(props) {

    // Définition des states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [stayLogged, setStayLogged] = useState(false);

    // On définie les cookies que l'on vas utilisé ou créer
    const [cookies, setCookie] = useCookies(['_060698', '_031098']);

    // Cette fonction envoie les données à l'API pour vérifier si le compte existe
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || email.length === 0) {
            return
        }
        if (!password || password.length === 0) {
            return;
        }

        await API.login(email, password)
            .then(response => {
                let data = response.data;
                // On charge les cookies des données nécessaires à l'application
                /*
                    Si l'utilisateur souhaite rester connecté on donne une date d'expiration pour les cookies qui est de
                    6 mois après la connexion.
                */
                if (stayLogged) {
                    let date = new Date();
                    date.setMonth(date.getMonth() + 6);
                    setCookie('_060698', data.token, {path: '/', expires: date}); // token de connexion utilisateur
                    setCookie('_031098', data.refreshToken, {path: '/', expires: date});
                } else {
                    setCookie('_060698', data.token, {path: '/'}); // token de connexion utilisateur
                    setCookie('_031098', data.refreshToken, {path: '/'});
                }
            })
            .then(() => {
                /*
                    Si l'utilisateur à dû se connecter pour aller à la page de validation d'adresse mail il y a un localStorage
                    qui à été mis en place pour le rediriger vers la bonne page

                    localStorage = true -> connexion et redirection pour valider l'email
                    localStorage = false -> connexion normale et redirection vers home
                */
                if (!localStorage.getItem("14122013")) {
                    return <Redirect to="/home" />
                } else {
                    localStorage.removeItem("14122013")
                    return <Redirect to="/validemail" />
                }
            })
            .catch(error => {
                return setError(error.response.data.text);
            })
}

/*
    Les 2 fonctions ci-dessous (redirectSignup et redirectEntrepriseSignup) servent à gérer la redirection vers les pages
    d'inscriptions.
*/
const redirectSignup = () => {
    window.location = "/signup";
}

const redirectEntrepriseSignup = () => {
    window.location = "/signup/entreprise";
}

// Si le cookie est déjà en place l'utilisateur est déjà connecté donc on redirige vers home
if (cookies._060698) {
    return <Redirect to="/home" />
}

if (!error) {
    return (
        <div className="auth-container">
            <section className="auth-side-form">
                <form onSubmit={handleSubmit} className='auth-form'>
                    <h1 className="auth-title">J'ai déjà un compte !</h1>
                    <div className="auth-fields">
                        <input
                            id="email"
                            placeholder="Adresse email"
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        <input
                            id="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                    <section>
                        <div>
                            <p>Rester connecté</p>
                            <input type="checkbox" id="stayLogged" checked={stayLogged}
                                   onChange={e => setStayLogged(e.target.checked)}/>
                        </div>
                        <p className="redirect-forgot"><a href="/forgotpassword">Mot de passe oublié ?</a></p>
                    </section>
                    <div className="auth-bottom">
                        <input type="submit" value="Connexion"/>
                    </div>
                </form>
                <p className="separator">ou</p>
                <div className="redirect-signup user-signup" onClick={redirectSignup}>
                    <span>Je m'inscrit maintenant</span>
                </div>
                <div className="redirect-signup entreprise-signup" onClick={redirectEntrepriseSignup}>
                    <span>J'inscrit mon entreprise</span>
                </div>
            </section>
            <section className="auth-side-other"></section>
        </div>
    )
} else {
    return (
        <div className="auth-container">
            <section className="auth-side-form">
                <form onSubmit={handleSubmit} className='auth-form'>
                    <h1 className="auth-title">J'ai déjà un compte !</h1>
                    <p className="auth-error">{error}</p>
                    <div className="auth-fields">
                        <input
                            id="email"
                            placeholder="Adresse email"
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        <input
                            id="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                    <section>
                        <div>
                            <p>Rester connecté</p>
                            <input type="checkbox" id="stayLogged" checked={stayLogged}
                                   onChange={e => setStayLogged(e.target.checked)}/>
                        </div>
                        <p className="redirect-forgot"><a href="/forgotpassword">Mot de passe oublié ?</a></p>
                    </section>
                    <div className="auth-bottom">
                        <input type="submit" value="Connexion"/>
                    </div>
                </form>
                <p className="separator">ou</p>
                <div className="redirect-signup user-signup" onClick={redirectSignup}>
                    <span>Je m'inscrit maintenant</span>
                </div>
                <div className="redirect-signup entreprise-signup" onClick={redirectEntrepriseSignup}>
                    <span>J'inscrit mon entreprise</span>
                </div>
            </section>
            <section className="auth-side-other"></section>
        </div>
    )
}

}
