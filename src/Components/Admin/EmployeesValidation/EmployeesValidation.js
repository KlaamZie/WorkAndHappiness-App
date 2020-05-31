import React, {useState} from 'react';
import API from "../../../utils/Admin";

import NoEmployeesToValidate from './NoEmployeesToValidate';
import NoValidatedEmployees from './NoValidatedEmployees';

export default function EmployeesToValidate(props) {

    // Définition des states
    const [employeesToValidate, setEmployeesToValidate] = useState(props.entreprise.employeesToValidate)
    const [validatedEmployees, setValidatedEmployees] = useState(props.entreprise.validatedEmployees)

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

    const handleRole = (isAdmin, isModo) => {
        if (isAdmin) {
            return 'Admin';
        } else if (!isAdmin && isModo) {
            return 'Modo';
        } else if (!isAdmin && !isModo) {
            return 'User';
        }
    }

    if (!employeesToValidate.length && !validatedEmployees.length) {
        return (
            <div className="validation">
                <NoEmployeesToValidate/>
                <NoValidatedEmployees/>
            </div>
        )
    }

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
