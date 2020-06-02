/*
    Ce composant gère la Sidenav, c'est grâce à la sidenav que l'utilisateur navigue entre les différentes pages.

    Il récupère les données de l'utilisateur dans le context afin de vérifier si l'utlisateur est Admin ou Modo pour lui
    afficher le lien vers l'Admin.
*/

import React, {useState, useContext} from 'react';
import Context from '../../Context/Context';
import API from "../../utils/Auth";
import AdminNav from "./AdminNav/AdminNav"
import './Sidenav.scss'

import Logo from './Logo.png';

export default function Sidenav(props) {

    // Définition des states
    const activeMenu = (window.location.pathname).substring(1);
    const {user} = useContext(Context);

    const disconnect = async () => {
        await API.logout();
        document.cookie = "_060698=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
        document.cookie = "_031098=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
        window.location = "/";
    };

    /* Gestion du menu mobile */
    const [sidenav, setSidenav] = useState(false)

    const displaySidenav = () => {
        document.getElementById('display-sidenav').style.display = "flex";
        document.getElementById('wrapper').style.filter = "blur(1.5px)";
        setSidenav(true);
    }

    const closeSidenav = () => {
        document.getElementById('display-sidenav').style.display = "none";
        document.getElementById('wrapper').style.filter = "blur(0px)";
        setSidenav(false);
    }

    const handleSidenav = () => {
        if (sidenav) {
            closeSidenav()
        } else {
            displaySidenav()
        }
    }
    /* Fin du menu mobile */

    return (
        <div className="sidenav">
            <div id="hamburger-menu" onClick={handleSidenav}>
                {sidenav ? <i className="material-icons">close</i> : <i className="material-icons">menu</i>}
            </div>
            <div className="sidenav-container" id="display-sidenav">
                <div className="sidenav-top-container">

                    <img src={Logo} alt="Logo"/>

                    <div className='menu-container'>

                        <a href="/home" id="home" className={`${activeMenu === "home" ? "activeMenu" : "menuItems"}`}>
                            <p>Accueil</p>
                            <span className="material-icons">home</span>
                        </a>

                        <a href="/dashboard" id="dashboard"
                           className={`${activeMenu === "dashboard" ? "activeMenu" : "menuItems"}`}>
                            <p>Tableau de bord</p>
                            <span className="material-icons">dashboard</span>
                        </a>

                        <a href="/form" id="form" className={`${activeMenu === "form" ? "activeMenu" : "menuItems"}`}>
                            <p>Questionnaire</p>
                            <span className="material-icons">ballot</span>
                        </a>

                    </div>

                    {
                        user.isAdmin || user.isModo ? <AdminNav activeMenu={activeMenu}/> : null
                    }
                </div>

                <input onClick={disconnect} type="submit" className='disconnect' value="Déconnexion"/>

            </div>
        </div>
    )
}
