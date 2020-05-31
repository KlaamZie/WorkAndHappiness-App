import React, {useState} from "react";
import '../../Auth.scss';
import '../Signup.scss';

import axios from 'axios';

export default function Confirmation(props) {

    const [email, setEmail] = useState("");
    const [sendemail, setSendemail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const burl = "https://api.workandhappiness.fr";
        const headers = {
            "Content-Type": "application/json"
        };
        let idEntreprise = props.id;
        await axios.post(`${burl}/entreprise/sendmail`, {email, idEntreprise}, {headers: headers})
            .then(response => {
                setSendemail("Email envoyé avec succès !")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const redirectSignup = () => {
        window.location = '/signup';
    }

    if (!sendemail) {
        return (
            <div className="auth-container">
                <section className="auth-side-form confirmation-container">
                    <form onSubmit={handleSubmit} className='auth-form confirmation-form'>
                        <p className="auth-title confirmation-title">L'entreprise <strong>{props.name}</strong> à bien
                            été inscrite !</p>
                        <p className="auth-title confirmation-title">Son identifiant est : <strong>{props.id}</strong>
                        </p>
                        <p className="auth-title confirmation-title">Gardez bien cet identifiant, il vous servira pour
                            créer votre compte. Si vous souhaitez recevoir ces informations par mail, il vous suffit
                            d'entrer votre adresse ci-dessous :</p>
                        <div className="auth-fields">
                            <input
                                id="email"
                                placeholder="Adresse email"
                                autoFocus
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="auth-bottom">
                            <input type="submit" value="Envoyer par mail"/>
                        </div>
                        <p className="auth-title confirmation-title">Il ne reste plus qu'à créer votre compte en
                            cliquant sur le bouton ci-dessous :</p>
                        <div className="auth-bottom" onClick={redirectSignup}>
                            <input type="button" value="Je m'inscrit maintenant"/>
                        </div>
                    </form>
                </section>
                <section className="auth-side-other"></section>
            </div>
        )
    } else {
        return (
            <div className="auth-container">
                <section className="auth-side-form confirmation-container">
                    <form onSubmit={handleSubmit} className='auth-form confirmation-form'>
                        <p className="auth-title confirmation-title">L'entreprise <strong>{props.name}</strong> à bien
                            été inscrite !</p>
                        <p className="auth-title confirmation-title">Son identifiant est : <strong>{props.id}</strong>
                        </p>
                        <p className="auth-title confirmation-title">Gardez bien cet identifiant, il vous servira pour
                            créer votre compte. Si vous souhaitez recevoir ces informations par mail, il vous suffit
                            d'entrer votre adresse ci-dessous :</p>
                        <p className="confirmation-sendemail">{sendemail}</p>
                        <div className="auth-fields">
                            <input
                                id="email"
                                placeholder="Adresse email"
                                autoFocus
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="auth-bottom">
                            <input type="submit" value="Envoyer par mail"/>
                        </div>
                        <p className="auth-title confirmation-title">Il ne reste plus qu'à créer votre compte en
                            cliquant sur le bouton ci-dessous :</p>
                        <div className="auth-bottom" onClick={redirectSignup}>
                            <input type="button" value="Je m'inscrit maintenant"/>
                        </div>
                    </form>
                </section>
                <section className="auth-side-other"></section>
            </div>
        )
    }
}
