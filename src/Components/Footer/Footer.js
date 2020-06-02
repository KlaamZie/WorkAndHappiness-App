/*
    Comme son nom l'indique ce composant gère le pied de page de l'application,
    il permet de rediriger vers les différentes pages du RGPD mais aussi de réouvrir le widget permettant de modifier ses
    préférences en matière de cookies.
*/

import React from "react";

import './Footer.scss';

export default function Footer(props) {
    return (
        <footer>
            <ul>
                <li><a href="https://workandhappiness.fr/cgs" target="_blank" rel="noopener noreferrer">CGS</a></li>
                <li><a href="https://workandhappiness.fr/cgu" target="_blank" rel="noopener noreferrer">CGU</a></li>
                <li><a href="https://workandhappiness.fr/confidentialite" target="_blank"
                       rel="noopener noreferrer">Confidentialité</a></li>
                <li><a href="https://workandhappiness.fr/cookies" target="_blank" rel="noopener noreferrer">Cookies</a>
                </li>
                <li><a href="https://workandhappiness.fr/mentions-legales/" target="_blank" rel="noopener noreferrer">Mentions
                    légales</a></li>
                <li><a href="javascript:showAxeptioButton()">
                    Modifier vos préférences en matière de cookies
                </a></li>
            </ul>
        </footer>
    )
}