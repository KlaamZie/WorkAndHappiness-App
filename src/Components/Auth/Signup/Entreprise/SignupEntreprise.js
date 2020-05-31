import React, { useState } from "react";
import {Redirect} from "react-router-dom";
import {useCookies} from 'react-cookie';
import API from "../../../../utils/Auth";

import Confirmation from './Confirmation';

import '../../Auth.scss';
import '../Signup.scss';

export default function Signup(props) {

  // Définition des states
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState("");

  const [cookies] = useCookies(['_060698']);

  // Fonction qui envoie les données à l'API pour inscrire l'utilisateur
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("")
    if (!name || name.length === 0) return;

    try {
      const { data } = await API.signupEntreprise(name);
      setId(data._id);
    }
    catch (error) {
      return setError(error.response.data.text);
    }

    setConfirmation(true);

  };

  const redirectLogin = () => {
    window.location = "/";
  }

  if (confirmation) {
    return <Confirmation id={id} name={name}/>
  }

  // Si le cookie est déjà en place l'utilisateur est déjà connecté donc on redirige vers home
  if (cookies._060698) {
    return <Redirect to="/home" />
  }

  if (!confirmation) {
    if (!error) {
      return (
        <div className="auth-container">
          <section className="auth-side-form">
            <form onSubmit={handleSubmit} className="auth-form signup">
              <div className="redirect-login" onClick={redirectLogin}>
                <p>J'ai déjà un compte</p>
              </div>
              <h1 className="auth-title signup-title">Mon Entreprise</h1>
              <div className="auth-fields">
                <input
                  autoFocus
                  id="entrepriseName"
                  type="text"
                  placeholder="Nom de l'entreprise"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="auth-bottom">
                <input type="submit" value="Créer mon espace entreprise" />
              </div>
            </form>

          </section>
          <section className="auth-side-other"></section>
        </div>

      )
    }

    else {
      return (
        <div className="auth-container">
          <section className="auth-side-form">
            <form onSubmit={handleSubmit} className="auth-form signup">
              <div className="redirect-login" onClick={redirectLogin}>
                <p>J'ai déjà un compte</p>
              </div>
              <h1 className="auth-title signup-title">Mon Entreprise</h1>
              <p className="auth-error">{error}</p>
              <div className="auth-fields">
                <input
                  autoFocus
                  id="entrepriseName"
                  type="text"
                  placeholder="Nom de l'entreprise"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="auth-bottom">
                <input type="submit" value="Créer mon espace entreprise" />
              </div>
            </form>

          </section>
          <section className="auth-side-other"></section>
        </div>
      )
    }
  }
}
