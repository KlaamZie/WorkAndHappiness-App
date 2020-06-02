/*
    Ce composant correspond à la pages des paramètres du compte.
    Il appel d'autres composant situé dans le même dossier afin de les afficher.
    Chaque sous composant est chargé avec les props nécessaire à leurs fonctionnement.
*/

import React, {useContext} from 'react';
import Context from '../../Context/Context';

import './Params.scss';

import Infos from './Infos';
import ChangeId from './ChangeId';
import Rgpd from './Rgpd';

export default function Params(props) {

    const {user, entreprise} = useContext(Context);

    while (!user.email) {
        return (
            <div className='content-container loading-container'>
                <p className='loading'>Chargement...</p>
            </div>
        )
    }

    return (
        <div className="content-container">
            <Infos user={user} entreprise={entreprise}/>
            <ChangeId email={user.email} firstname={user.firstname}/>
            <Rgpd user={user}/>
        </div>
    )
}
