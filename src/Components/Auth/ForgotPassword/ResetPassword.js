/*
    Suivre ces étapes pour comprendre les explications :
        1 - ForgotPassword
        2 - CheckCode
        3 - ResetPassword

    Ce composant permet à l'utilisateur de réinitialiser son mot de passe.
    Cette étape est simplement composée de 2 champs input de type password.
    Ces champs permettent d'entrer un nouveau mot de passe et de le valider en le tapant une deuxième fois.
    On appelle ensuite l'API lors de la validation pour enregistrer et crypté le nouveau mot de passe puis on redirige
    l'utilisateur vers la page de connexion.
*/

import React, { useState } from "react";
import API from "../../../utils/Auth";
import '../Auth.scss';

export default function ResetPassword(props) {

  // Définition des states
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  // Fonction qui envoie les données à l'API pour modifier les mots de passes
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!props.email || props.email.length === 0) {
      return;
    }
    if (!password || password.length === 0) return;
    if (password !== cpassword) {
      setError("Les mots de passes ne correspondent pas")
      return;
    }

    try {
      await API.resetPassword(props.email, password);
    }
    catch (error) {
      return setError(error.response.data.text);
    }

    alert("Mot de passe réinitialisé !");
    window.location = "/";
  };

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
            value={props.email}
            disabled="disabled"/>
          <input
            id="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            />
          <input
            id="cpassword"
            placeholder="Confirmez le nouveau mot de passe"
            value={cpassword}
            onChange={e => setCPassword(e.target.value)}
            type="password"
            />
        </div>
        <div className="auth-bottom">
          <input type="submit" value="Réinitialiser" />
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
      <form onSubmit={handleSubmit} className='auth-form'>
        <h1 className="auth-title">Mot de passe oublié</h1>
        <p className="auth-error">{error}</p>
        <div className="auth-fields forgot-field">
          <input
            id="email"
            autoFocus
            type="email"
            value={props.email}
            disabled="disabled"/>
          <input
            id="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            />
          <input
            id="cpassword"
            placeholder="Confirmez le nouveau mot de passe"
            value={cpassword}
            onChange={e => setCPassword(e.target.value)}
            type="password"
            />
        </div>
        <div className="auth-bottom">
          <input type="submit" value="Réinitialiser" />
        </div>
      </form>
      </section>
      <section className="auth-side-other"></section>
      </div>
    )
  }
}
