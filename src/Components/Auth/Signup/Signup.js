/*
    Ce petit composant sert à retourner le bon composant lorsque l'utilisateur veux s'inscrire ou lorsque l'utilisateur
    veux créer une nouvelle entreprise sur l'application.

    On se base sur l'url de la page demandée, si l'url se termine simplement par "signup" on retourne le composant permettant
    la création d'un compte utilisateur. Par contre si l'url se termine par "entreprise" (signup/entreprise) on retourne
    le composant permettant la création d'une nouvelle entreprise.
*/

import React from 'react'

import SignupUser from './User/SignupUser';
import SignupEntreprise from './Entreprise/SignupEntreprise';

export default function Signup() {

    // Définition des states routeur
    let signupType = window.location.pathname.split("/").pop();

    if (signupType === "signup") {
        return (
            <SignupUser />
        )
    }

    if (signupType === "entreprise") {
        return (
            <SignupEntreprise />
        )
    }
}
