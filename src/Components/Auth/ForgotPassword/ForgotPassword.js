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

    const nextStep = (event) => {
        setSteps(steps + 1)
    }

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
