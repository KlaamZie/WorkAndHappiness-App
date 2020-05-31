import React, {useContext} from 'react';
import Context from '../../Context/Context';

import './Admin.scss';

import EmployeesValidation from './EmployeesValidation/EmployeesValidation';

export default function Admin(props) {

    const {user, entreprise} = useContext(Context);

// !entreprise.name && !entreprise._id
    while (!entreprise.name && !entreprise._id) {
        return (
            <div className='content-container loading-container'>
                <p className='loading'>Chargement...</p>
            </div>
        )
    }

    if (!user.isAdmin && !user.isModo) {
        return window.location = "/home"
    }

    console.log(entreprise)

    return (
        <div className='content-container'>
            <EmployeesValidation entreprise={entreprise} user={user}/>
        </div>
    )
}
