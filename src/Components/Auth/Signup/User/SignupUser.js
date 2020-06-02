/*
    Ce composant gère toute la partie dédiée à l'inscription d'un utilisateur.
    Pour s'inscrire l'utilisateur doit remplir plusieurs champs :
        - Prénom
        - Nom
        - Identifiant d'entreprise
        - email
        - mot de passe
        - confirmation du mot de passe
    Il doit ensuite cocher des cases pour définir ses préférences en matières de mailing puis pour fini cocher une case
    pour confirmer qu'il à lu et qu'il accepte les CGU et la Politique de Confidentialité.
    Une fois validé on appelle l'API pour créer le compte et le lié à l'entreprise. Un fois que l'API à terminée elle nous
    renvoie 2 token qu'on stocke dans les cookies puis on redirige l'utilisateur vers la page d'accueil.
*/

import React, {useState} from "react";
import { Redirect } from "react-router-dom"
import {useCookies} from 'react-cookie';
import Checkbox from '@material-ui/core/Checkbox';
import API from "../../../../utils/Auth";
import '../../Auth.scss';
import '../Signup.scss';

export default function Signup(props) {

    // Définition des states
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [idEntreprise, setIdEntreprise] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [weeklyMail, setWeeklyMail] = useState(false);
    const [monthlyMail, setMonthlyMail] = useState(false);
    const [cgu, setCgu] = useState(false);
    const [error, setError] = useState("");

    const [cookies, setCookie] = useCookies(['_060698', '_031098']);

    // Fonction qui envoie les données à l'API pour inscrire l'utilisateur
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("")
        // Enchainement de if pour vérifier que toutes les données sont valides
        if (!firstname || firstname.length === 0) return;
        if (!lastname || lastname.length === 0) return;
        if (!idEntreprise || idEntreprise.length === 0) return;
        if (!email || email.length === 0) return;
        if (!password || password.length === 0) return;
        if (password !== cpassword) {
            return setError("Les mots de passes ne correspondent pas.");
        }
        if (!cgu) {
            return setError("Pour utiliser l'application il faut accepter les cgu !");
        }

        await API.signup({firstname, lastname, idEntreprise, email, password, weeklyMail, monthlyMail, cgu})
            .then(response => {
                let data = response.data;
                setCookie('_060698', data.token, {path: '/'}); // token de connexion utilisateur
                setCookie('_031098', data.refreshToken, {path: '/'});
            })
            .then(() => {
                return <Redirect to="/home" />
            })
            .catch(error => {
                return setError(error.response.data.text);
            })
    };

    // Fonction permettant de rediriger vers la page de connexion si l'utilisateur à déjà un compte.
    const redirectLogin = () => {
        window.location = "/";
    }

    // Si le cookie est déjà en place l'utilisateur est déjà connecté donc on redirige vers home
    if (cookies._060698) {
        return <Redirect to="/home" />
    }

    if (!error) {
        return (
            <div className="auth-container">
                <section className="auth-side-form">
                    <form onSubmit={handleSubmit} className="auth-form signup">
                        <div className="redirect-login" onClick={redirectLogin}>
                            <p>J'ai déjà un compte</p>
                        </div>
                        <h1 className="auth-title signup-title">Inscription</h1>
                        <div className="auth-fields">
                            <input
                                autoFocus
                                id="firstname"
                                type="text"
                                placeholder="Prénom"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                            <input
                                id="lastname"
                                type="text"
                                placeholder="Nom"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                            <input
                                id="idEntreprise"
                                type="text"
                                placeholder="Identifiant de l'entreprise"
                                value={idEntreprise}
                                onChange={e => setIdEntreprise(e.target.value)}
                            />
                            <input
                                id="email"
                                type="email"
                                placeholder="Adresse mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                placeholder="Mot de passe"
                            />
                            <input
                                id="cpassword"
                                value={cpassword}
                                onChange={e => setCPassword(e.target.value)}
                                type="password"
                                placeholder="Confirmez le mot de passe"
                            />
                            <div className="rgpd">
                                <div className="rgpd-items">
                                    <label>J'accepte de recevoir chaque semaine un mail m'informant des nouveautés de la
                                        semaine.</label>
                                    <Checkbox
                                        id="weeklyMail"
                                        checked={weeklyMail}
                                        onChange={e => setWeeklyMail(e.target.checked)}
                                        color="primary"
                                    />
                                </div>
                                <div className="rgpd-items">
                                    <label>J'accepte de recevoir chaque mois un mail m'informant de ma progression ainsi
                                        que des nouveautés de l'application.</label>
                                    <Checkbox
                                        id="monthlyMail"
                                        checked={monthlyMail}
                                        onChange={e => setMonthlyMail(e.target.checked)}
                                        color="primary"
                                    />
                                </div>
                                <div className="rgpd-items">
                                    <label>J'ai lu et j'accepte les <a href="https://workandhappiness.fr/cgu/" target="_blank">conditions d'utilisation</a> et la <a href="https://workandhappiness.fr/confidentialite/" target="_blank">politique de
                                        confidentialité</a> de l'application.</label>
                                    <Checkbox
                                        id="cgu"
                                        checked={cgu}
                                        onChange={e => setCgu(e.target.checked)}
                                        color="primary"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="auth-bottom">
                            <input type="submit" value="Inscription"/>
                        </div>
                    </form>

                </section>
                <section className="auth-side-other"></section>
            </div>

        )
    } else {
        return (
            <div className="auth-container">
                <section className="auth-side-form">
                    <form onSubmit={handleSubmit} className="auth-form signup">
                        <div className="redirect-login" onClick={redirectLogin}>
                            <p>J'ai déjà un compte</p>
                        </div>
                        <h1 className="auth-title signup-title">Inscription</h1>
                        <p className="auth-error">{error}</p>
                        <div className="auth-fields">
                            <input
                                autoFocus
                                id="firstname"
                                type="text"
                                placeholder="Prénom"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                            <input
                                id="lastname"
                                type="text"
                                placeholder="Nom"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                            <input
                                id="idEntreprise"
                                type="text"
                                placeholder="Identifiant de l'entreprise"
                                value={idEntreprise}
                                onChange={e => setIdEntreprise(e.target.value)}
                            />
                            <input
                                id="email"
                                type="email"
                                placeholder="Adresse mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                placeholder="Mot de passe"
                            />
                            <input
                                id="cpassword"
                                value={cpassword}
                                onChange={e => setCPassword(e.target.value)}
                                type="password"
                                placeholder="Confirmez le mot de passe"
                            />
                            <div className="rgpd">
                                <div className="rgpd-items">
                                    <label>J'accepte de recevoir chaque semaine un mail m'informant des nouveautés de la
                                        semaine.</label>
                                    <Checkbox
                                        id="weeklyMail"
                                        checked={weeklyMail}
                                        onChange={e => setWeeklyMail(e.target.checked)}
                                        color="primary"
                                    />
                                </div>
                                <div className="rgpd-items">
                                    <label>J'accepte de recevoir chaque mois un mail m'informant de ma progression ainsi
                                        que des nouveautés de l'application.</label>
                                    <Checkbox
                                        id="monthlyMail"
                                        checked={monthlyMail}
                                        onChange={e => setMonthlyMail(e.target.checked)}
                                        color="primary"
                                    />
                                </div>
                                <div className="rgpd-items">
                                    <label>J'ai lu et j'accepte les conditions d'utilisation et la politique de
                                        confidentialité de l'application.</label>
                                    <Checkbox
                                        id="cgu"
                                        checked={cgu}
                                        onChange={e => setCgu(e.target.checked)}
                                        color="primary"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="auth-bottom">
                            <input type="submit" value="Inscription"/>
                        </div>
                    </form>

                </section>
                <section className="auth-side-other"></section>
            </div>
        )
    }
}
