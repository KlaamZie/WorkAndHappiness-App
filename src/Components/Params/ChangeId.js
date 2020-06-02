/*
    Ce composant gère les changements d'adresse mail et de mot de passe.
    Il retourne 2 formulaires (1 pour l'adresse mail, l'autre pour le mot de passe).

    Une fois validé chaque formulaire appelle une fonction différente :
        - handleEmailSubmit : pour le changement d'adresse mail
        - handlePasswordSubmit : pour le changement de mot de passe

    Les 2 fonctions ont à peut prêt le même fonctionnement, elles regardent dans un premier temps si les données sont
    valides, si elles sont valides elles appellent l'API pour effectuer le changement sur la base de donnée.
    Si l'API ne retourne pas d'erreur les fonctions informent l'utilisateur que tout c'est bien passer puis le déconnecte
    pour qu'il puisse se reconnecter avec sa nouvelle adresse mail ou son nouveau mot de passe.
*/

import React, {useState} from 'react'
import API from "../../utils/Params";
import Logout from "../../utils/Auth";

export default function ChangeId(props) {

    // Définition des states
    const [previousEmail, setPreviousEmail] = useState("");
    const [previousPassword, setPreviousPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailSubmit = async (event) => {

        event.preventDefault();
        if (!previousEmail || previousEmail.length === 0) return;
        if (!newEmail || newEmail.length === 0) return;
        if (!confirmEmail || confirmEmail.length === 0) return;

        if (newEmail !== confirmEmail) {
            alert('Les emails ne correspondent pas.');
            return;
        }
        await API.changeEmail({previousEmail, newEmail})
            .then(() => {
                alert('Email modifié avec succès');
                Logout.logout();
                document.cookie = "_060698=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
                document.cookie = "_031098=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
                window.location.reload();
            })
            .catch((error) => {
                alert(error.response.data.text);
            })
    };

    const handlePasswordSubmit = async (event) => {

        event.preventDefault();
        if (!previousPassword || previousPassword.length === 0) return;
        if (!newPassword || newPassword.length === 0) return;
        if (!confirmPassword || confirmPassword.length === 0) return;

        if (newPassword !== confirmPassword) {
            alert('Les mots de passes ne correspondent pas.');
            return;
        }
        await API.changePassword({previousPassword, newPassword})
            .then(() => {
                alert('Mot de passe modifié avec succès');
                Logout.logout();
                document.cookie = "_060698=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
                document.cookie = "_031098=0; expires= Wed, 18 Sep 1974 20:00:00 UTC";
                window.location.reload();
            })
            .catch((error) => {
                alert(error.response.data.text);
            })
    }

    return (
        <div className="changeId">

            <div className="changeId-container">
                <h1>Changez votre adresse mail</h1>
                <form onSubmit={handleEmailSubmit} className='changeId-form'>
                    <input
                        placeholder="Adresse mail actuelle"
                        id="previousEmail"
                        type="email"
                        value={previousEmail}
                        onChange={e => setPreviousEmail(e.target.value)}
                    />
                    <input
                        placeholder="Nouvelle adresse mail"
                        id="newEmail"
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)}
                        type="email"
                    />
                    <input
                        placeholder="Confirmez la nouvelle adresse mail"
                        id="confirmEmail"
                        value={confirmEmail}
                        onChange={e => setConfirmEmail(e.target.value)}
                        type="email"
                    />
                    <input type="submit" value="Changer"/>
                </form>
            </div>

            <div className="changeId-container">
                <h1>Changez votre mot de passe</h1>
                <form onSubmit={handlePasswordSubmit} className='changeId-form'>
                    <input
                        placeholder="Mot de passe actuel"
                        id="previousPassword"
                        type="password"
                        value={previousPassword}
                        onChange={e => setPreviousPassword(e.target.value)}
                    />
                    <input
                        placeholder="Nouveau mot de passe"
                        id="newPassword"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        type="password"
                    />
                    <input
                        placeholder="Confirmez le nouveau mot de passe"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                    />
                    <input type="submit" value="Changer"/>
                </form>
            </div>

        </div>
    );

}
