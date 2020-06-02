/*

    Ce composant gère la validation et la suppression des employées ainsi que l'attribution des rôles.

*/

import React, {useState} from 'react';
// Import des fonctions définies dans le fichier Admin afin de réaliser les call API
import API from "../../../utils/Admin";

// Import de deux composants qui s'afficheront s'il n'y à aucun employé à valider ou aucun employer validé.
import NoEmployeesToValidate from './NoEmployeesToValidate';
import NoValidatedEmployees from './NoValidatedEmployees';

export default function EmployeesToValidate(props) {

    /*
        Définition des states
        Grâce aux props envoyées par le composant parent "Admin.js" on récupère dans la props "entreprise" les employés
        à valider ainsi que ceux déjà validé et on les stock dans un state.
    */
    const [employeesToValidate, setEmployeesToValidate] = useState(props.entreprise.employeesToValidate)
    const [validatedEmployees, setValidatedEmployees] = useState(props.entreprise.validatedEmployees)

    /*
        Fonction qui gère la validation d'un employé elle prend en paramètre "i" qui correspond à l'index de l'employé
        dans le tableau stocker dans le state ("employeesToValidate").

        On push(ajoute) d'abord l'employée dans le tableau des employés validé puis on le supprime du tableau des employé
        à valider. On appelle ensuite l'API grâce à la fonction "valid" du fichier admin en lui passant en argument l'email
        de l'employé à valider afin de modifier les tableaux dans la base de données.
    */
    const handleValidation = async (i) => {
        let validUser = employeesToValidate[i];

        let validatedEmployeesArray = validatedEmployees.slice();
        validatedEmployeesArray.push(validUser);
        setValidatedEmployees(validatedEmployeesArray);

        let employeesToValidateArray = employeesToValidate.slice();
        const find = employeesToValidateArray.findIndex(employee => employee.email === validUser.email)
        employeesToValidateArray.splice(find, 1);
        setEmployeesToValidate(employeesToValidateArray);

        try {
            await API.valid(validUser.email);
        } catch (error) {
            return;
        }
    }

    /*
        Fonction qui gère la suppression d'un employé elle prend en paramètre "i" qui correspond à l'index de l'employé
        dans l'un des tableaux stockés dans le state ("employeesToValidate" ou "validatedEmployees") et "event" qui permettra de récupérer l'attribut "id"
        du boutton qui correspondra au type d'employé à supprimer (à valider ou déjà validé).

        On regarde donc d'abord l'attribut "id" afin de savoir si l'employé était à valider (toValidate) ou déjà validé (validated).
        Ensuite on le recherche et on le stocke dans une variable grâce à son index (i).

        Et de la même manière que au dessus on le supprime du tableau puis on appelle l'api avec son email afin de le supprimer
        du tableau dans la base de données

        Si l'attribut "id" correspond à "validated" (employé déjà validé) il y à 2 conditions en plus afin de vérifier qu'un
        utilisateur ne se supprime pas lui même et si l'utilisateur à les droits nécessaire afin de supprimer l'employé, un Modo
        ne peut pas supprimer un Admin.
    */
    const handleDelete = async (i, event) => {
        let type = event.target.id;
        if (type === "toValidate") {
            let deleteUser = employeesToValidate[i];

            let employeesToValidateArray = employeesToValidate.slice();
            const find = employeesToValidateArray.findIndex(employee => employee.email === deleteUser.email)
            employeesToValidateArray.splice(find, 1);
            setEmployeesToValidate(employeesToValidateArray);

            try {
                await API.deleteToValidate(deleteUser.email);
            } catch (error) {
                return;
            }
        }

        if (type === "validated") {
            let uid = props.user._id;
            let deleteUser = validatedEmployees[i];

            if (uid === deleteUser.uid) {
                return alert("Vous ne pouvez pas vous supprimer vous même !");
            }
            if (deleteUser.isAdmin && !props.user.isAdmin) {
                return alert("Vous ne pouvez pas supprimer un Administrateur si vous ne l'êtes pas vous même !")
            }

            let validatedEmployeesArray = validatedEmployees.slice();
            const find = validatedEmployeesArray.findIndex(employee => employee.email === deleteUser.email)
            validatedEmployeesArray.splice(find, 1);
            setValidatedEmployees(validatedEmployeesArray);

            try {
                await API.deleteValidated(deleteUser.email);
            } catch (error) {
                return;
            }
        }

    }

    /*
        Fonction qui gère la modification des rôles elle prend en paramètre "i" qui correspond à l'index de l'employé
        dans le tableau stocké dans le state ("validatedEmployees") et "event" qui permettra de récupérer l'attribut "value"
        du champs= select qui correspondra au rôle de l'employé.

        On stocke donc d'abord l'attribut "value" du champ (event.target.value), on fait ensuite une copie du tableau des
        employés validé stocké dans le state (validatedEmployees.slice()) car il n'est pas conseiller de modifier un tableau directement.
        Pour finir avec la récupération des données on récupère l'employé à modifier grâce à son index (i) dans le tableau.

        Grâce à la variable value qui correspond au champ select , nous pouvons créer des conditions en fonction du nouveau rôle désiré.
        Ensuite pour chaque condition les étapes sont les même, on vérifie que l'utilisateur qui souhaite modifier les rôles
        à bien le niveau nécessaire (un Modo ne peut pas rétrograder un admin ni définir un admin). Puis on modifie l'utilisateur
        dans la copie du tableau, ensuite on appelle l'API avec l'email de l'utilisateur à modifier (chaque changement à une
        route bien définie), si il n'y à pas d'erreur, on remplace le tableau stocké dans le state par la copie modifiée.
    */
    const changeRole = async (i, event) => {
        let value = event.target.value;
        let validatedEmployeesArray = validatedEmployees.slice();
        let changeUser = validatedEmployeesArray[i];
        if (value === 'Admin') {
            if (!props.user.isAdmin) {
                return alert("Seul les Administrateurs peuvent définir les Administrateurs !")
            }
            changeUser.isAdmin = true;
            changeUser.isModo = true;
            try {
                await API.makeAdmin(changeUser.email);
            } catch (error) {
                return;
            }
        } else if (value === 'Modo') {
            if (changeUser.isAdmin && !props.user.isAdmin) {
                return alert("Seul les Administrateurs peuvent rétrograder un Administrateur !")
            }
            changeUser.isAdmin = false;
            changeUser.isModo = true;
            try {
                await API.makeModo(changeUser.email)
            } catch (error) {
                return;
            }

        } else if (value === 'User') {
            if (changeUser.isAdmin && !props.user.isAdmin) {
                return alert("Seul les Administrateurs peuvent rétrograder un Administrateur !")
            }
            changeUser.isAdmin = false;
            changeUser.isModo = false;
            try {
                await API.makeUser(changeUser.email);
            } catch (error) {
                return;
            }
        }

        setValidatedEmployees(validatedEmployeesArray);
    }

    // Fonction permettant d'afficher les rôles des utilisateurs en fonctions des paramètres qu'on lui passe lors du rendu.
    const handleRole = (isAdmin, isModo) => {
        if (isAdmin) {
            return 'Admin';
        } else if (!isAdmin && isModo) {
            return 'Modo';
        } else if (!isAdmin && !isModo) {
            return 'User';
        }
    }

    // Si il n'y à pas d'employé à valider et qu'il n'y à pas d'employé validé on retourne ce template.
    if (!employeesToValidate.length && !validatedEmployees.length) {
        return (
            <div className="validation">
                <NoEmployeesToValidate/>
                <NoValidatedEmployees/>
            </div>
        )
    }

    // SINON

    // Si il n'y à pas d'employé à valider mais qu'il y à des employés validés on retourne ce template.
    if (!employeesToValidate.length && validatedEmployees.length) {
        return (
            <div className="validation-container">
                <NoEmployeesToValidate/>
                <div className="validation-content-container">
                    <h1>Employées</h1>
                    {validatedEmployees.map((employee, i) => {
                        return (
                            <div key={employee.email} className="employee-container">
                                <div>
                                    <h2>{employee.firstname} {employee.lastname}</h2>
                                    <p>email : {employee.email}</p>
                                </div>
                                <div>
                                    <select value={handleRole(employee.isAdmin, employee.isModo)} name="role" id="role"
                                            onChange={(event) => changeRole(i, event)}>
                                        <option value="Admin">Administrateur</option>
                                        <option value="Modo">Modérateur</option>
                                        <option value="User">Utilisateur</option>
                                    </select>
                                    <i className="material-icons delete" id="validated"
                                       onClick={(event) => handleDelete(i, event)}>close</i>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        )
    }

    // SINON

    // Si il y à des employés à valider mais qu'il n'y à pas d'employés validés on retourne ce template.
    if (employeesToValidate.length && !validatedEmployees.length) {
        return (
            <div className="validation-container">
                <div className="validation-content-container">
                    <h1>Employées à valider</h1>
                    {employeesToValidate.map((employee, i) => {
                        return (
                            <div key={employee.email} className="employee-container">
                                <div>
                                    <h2>{employee.firstname} {employee.lastname}</h2>
                                    <p>email : {employee.email}</p>
                                </div>
                                <div>
                                    <i className="material-icons valid"
                                       onClick={(event) => handleValidation(i, event)}>done</i>
                                    <i className="material-icons delete" id="toValidate"
                                       onClick={(event) => handleDelete(i, event)}>close</i>
                                </div>
                            </div>)
                    })}
                </div>
                <NoValidatedEmployees/>
            </div>
        )
    }

    // SINON

    // Si il y à des employés à valider et qu'il y à des employés validés on retourne ce template.
    if (employeesToValidate.length && validatedEmployees.length) {
        return (
            <div className="validation-container">
                <div className="validation-content-container">
                    <h1>Employées à valider</h1>
                    {employeesToValidate.map((employee, i) => {
                        return (
                            <div key={employee.email} className="employee-container">
                                <div>
                                    <h2>{employee.firstname} {employee.lastname}</h2>
                                    <p>email : {employee.email}</p>
                                </div>
                                <div>
                                    <i className="material-icons valid"
                                       onClick={(event) => handleValidation(i, event)}>done</i>
                                    <i className="material-icons delete" id="toValidate"
                                       onClick={(event) => handleDelete(i, event)}>close</i>
                                </div>
                            </div>)
                    })}
                </div>
                <div className="validation-content-container">
                    <h1>Employées</h1>
                    {validatedEmployees.map((employee, i) => {
                        return (
                            <div key={employee.email} className="employee-container">
                                <div>
                                    <h2>{employee.firstname} {employee.lastname}</h2>
                                    <p>email : {employee.email}</p>
                                </div>
                                <div>
                                    <select value={handleRole(employee.isAdmin, employee.isModo)} name="role" id="role"
                                            onChange={(event) => changeRole(i, event)}>
                                        <option value="Admin">Administrateur</option>
                                        <option value="Modo">Modérateur</option>
                                        <option value="User">Utilisateur</option>
                                    </select>
                                    <i className="material-icons delete" id="validated"
                                       onClick={(event) => handleDelete(i, event)}>close</i>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        )
    }

}
