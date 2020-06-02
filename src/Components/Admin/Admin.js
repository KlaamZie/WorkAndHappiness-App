/*
    Ce composant gère la partie administration de l'application.
    Cette partie n'est accessible qu'aux utilisateurs qui sont administrateur ou modérateur de leur entreprise
    sur l'application. Elle permet notamment de valider les employés, de gérer leurs rôle (Admin, Modo, ou simple utilisateur)
    ou encore de supprimer des employés (en cas de départ).
*/

import React, {useContext} from 'react';
import Context from '../../Context/Context';

// Import de la feuille de style
import './Admin.scss';

// Import du composant permettant de valider, changer les rôles ou supprimer un employé.
import EmployeesValidation from './EmployeesValidation/EmployeesValidation';

export default function Admin(props) {

    // On importe depuis le context les données de l'utilisateur (l'administrateur qui se rend sur la page) et de l'entreprise.
    const {user, entreprise} = useContext(Context);

    // Temps que les données n'ont pas été importées on affiche une page de chargement
    while (!entreprise.name && !entreprise._id) {
        return (
            <div className='content-container loading-container'>
                <p className='loading'>Chargement...</p>
            </div>
        )
    }

    // Si l'utilisateur n'est ni Admin, ni Modo on le renvoie vers la page d'accueil
    if (!user.isAdmin && !user.isModo) {
        return window.location = "/home"
    }

    // Enfin si l'utilisateur répond à tous les critères on affiche les composants de l'administration.
    return (
        <div className='content-container'>
            {/* On affiche le composant */}
            <EmployeesValidation entreprise={entreprise} user={user}/>
        </div>
    )
}
