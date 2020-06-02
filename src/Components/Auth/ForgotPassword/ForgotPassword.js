/*
    Suivre ces étapes pour comprendre les explications :
        1 - ForgotPassword
        2 - CheckCode
        3 - ResetPassword
*/

/*

    Ce composant gère la première partie des mots de passe oubliés.
    Cette étape est simplement composée d'un champ input de type email.
    Ce champ permet de vérifier grâce à un appel à l'API qu'il existe bien un utilisateur avec cet email pour ensuite lui
    envoyer un code de vérification.

    Il gère aussi la logique du processus de réinitialition de mot de passe en définissant ce qui doit être rendu à
    chaque étape.

*/

import React, {useState} from "react";
import API from "../../../utils/Auth";
import '../Auth.scss';
import './Forgot.scss';

import CheckCode from './CheckCode';
import ResetPassword from './ResetPassword';

export default function ForgotPassword(props) {

    // Définition des states
    const [steps, setSteps] = useState(0);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // Fonction qui envoie les données à l'API pour vérifier si l'email existe et pour envoyer un code unique par mail
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || email.length === 0) {
            return;
        }

        // On envoie une requête au serveur pour obtenir le code unique de vérification
        await API.forgotPassword(email)
            .then(() => {
                setSteps(1)
            })
            .catch(error => {
                return setError(error.response.data.text);
            })
    };

    // Cette petite fonction sert uniquement à passer d'une étape à l'autre.
    const nextStep = (event) => {
        setSteps(steps + 1)
    }

    /*
        Cette suite de condition permet de définir ce qu'il faut rendre en fonction de l'étape à laquelle se situe l'utilisateur

        INFO : Sachant que le compteur commence à zéro si "steps" est égal à 1 cela signifie que l'utilisateur est à l'étape 2.

        Si l'utilisateur est à l'étape 2 (steps = 1) on lui retourne le composant permettant de vérifier le code qu'il à reçu par mail
        Si l'utilisateur est à l'étape 3 (steps = 2) on lui retourn le composant lui permettant de réinitialiser son mot de passe
        Enfin si l'utilisateur est à l'étape 1 (steps = 0, définie par if(!error)) on lui retourne un formulaire lui permettant de
        rentrer son adresse mail afin qu'on vérifie qu'il existe bien un compte associé à cette adresse en validant il passe à l'étape 2
        et grâce à un appel à l'API il reçois un code de vérification par mail qu'il devra rentrer afin de réinitialiser son mot de passe.
    */
    if (steps === 1) {
        return <CheckCode email={email} nextStep={nextStep}/>
    }
    if (steps === 2) {
        return <ResetPassword email={email}/>
    }

    if (!error) {
        return (
            <div className="auth-container">
                <section className="auth-side-form">
                    <form onSubmit={handleSubmit} className='auth-form'>
                        <h1 className="auth-title">Mot de passe oublié</h1>
                        <div className="auth-fields forgot-field">
                            <input
                                id="email"
                                autoFocus
                                type="email"
                                placeholder="Adresse mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="auth-bottom">
                            <input type="submit" value="Continuer"/>
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
                    <form onSubmit={handleSubmit} className='auth-form'>
                        <h1 className="auth-title">Mot de passe oublié</h1>
                        <p className="auth-error">{error}</p>
                        <div className="auth-fields forgot-field">
                            <input
                                id="email"
                                autoFocus
                                type="email"
                                placeholder="Adresse mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="auth-bottom">
                            <input type="submit" value="Continuer"/>
                        </div>
                    </form>
                </section>
                <section className="auth-side-other"></section>
            </div>
        )
    }
}
