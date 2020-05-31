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
