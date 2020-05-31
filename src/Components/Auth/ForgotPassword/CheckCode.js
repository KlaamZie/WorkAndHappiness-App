import React, { useState } from "react";
import API from "../../../utils/Auth";
import '../Auth.scss';
import './Forgot.scss'

export default function CheckCode(props) {

  // Définition des states
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  // Fonction qui envoie les données à l'API pour check si le code est bien relié a l'email
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      await API.checkCode(props.email, Number(code));
    }
    catch (error) {
      return setError(error.response.data.text);
    }

    props.nextStep();
  };

  if (!error) {
    return (
      <div className="auth-container">
      <section className="auth-side-form">
      <form onSubmit={handleSubmit} className='auth-form'>
        <h1 className="auth-title">Entrez le code de sécurité</h1>
        <div className="auth-fields forgot-field">
          <input
            id="email"
            autoFocus
            type="email"
            value={props.email}
            disabled="disabled"/>
          <input
            id="code"
            autoFocus
            type="text"
            placeholder="Code de sécurité"
            value={code}
            onChange={e => setCode(e.target.value)} />
        </div>
        <div className="auth-bottom">
          <input type="submit" value="Continuer" />
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
        <h1 className="auth-title">Entrez le code de sécurité</h1>
        <p className="auth-error">{error}</p>
        <div className="auth-fields forgot-field">
          <input
            id="email"
            autoFocus
            type="email"
            value={props.email}
            disabled="disabled"/>
          <input
            id="code"
            autoFocus
            type="text"
            placeholder="Code de sécurité"
            value={code}
            onChange={e => setCode(e.target.value)} />
        </div>
        <div className="auth-bottom">
          <input type="submit" value="Continuer" />
        </div>
      </form>
      </section>
      <section className="auth-side-other"></section>
      </div>
    )
  }

}
