import React, {useContext} from 'react';
import Context from '../../Context/Context';

import './Navbar.scss';

export default function Navbar(props) {

    const activeMenu = (window.location.pathname).substring(1);
    const {user, entreprise} = useContext(Context);

    let title = ""
    let idEntreprise = entreprise._id;

    switch (activeMenu) {
        case "home":
            title = entreprise.name;
            break;
        case "dashboard":
            title = "Tableau de bord";
            break;
        case "form":
            title = "Questionnaire";
            break;
        case "admin":
            title = `Administration ${entreprise.name}`;
            break;
        case "params":
            title = "Paramètres";
            break;
        default:
            title = entreprise.name;
    }

    return (
        <div className="navbar">
            <div className="welcome">
                {activeMenu === 'admin' ?
                    <h1>{title} - <span className="entreprise-infos">ID : {idEntreprise}</span></h1> : <h1>{title}</h1>}
            </div>
            <div className="userInfoAndOption">
                <p className="userInfoItem name">{user.firstname + ' ' + user.lastname}</p>
                <a href='/params' className="option material-icons-outlined">settings</a>
            </div>
        </div>
    )
}
