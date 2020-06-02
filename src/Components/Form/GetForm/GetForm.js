/*
    Ce composant est le premier sous-composant du questionnaire, il contient toute la partie logique (stockage des données,
    envoie des données, changement des valeurs, changement d'étape)

    Il permet aussi de récupérer les questions du formulaire et de les formatées grâce à la fonction getForm située
    dans le fichier functions.js

    Une fois les données récupérée et formatée par la fonction getForm, il les envoie au composant GetGroup qui s'occupera
    de mettre en forme et de retourné le questionnaire pour chaque étape.
*/

import React, {useState, useContext} from 'react';
import GetGroup from './GetGroup';
import {getForm} from './functions';

import Context from '../../../Context/Context';

import API from "../../../utils/Form";

export default function GetForm(props) {

    const {completeForm} = useContext(Context);

    // Définition des states
    let form = [];
    const [steps, setSteps] = useState(0);
    const [values, setValues] = useState([]);
    const [errorNotFull, setErrorNotFull] = useState("");

    /*
        Cette fonction permet de formatée les données du formulaire avant de les envoyées à l'API.

        On fait un .map sur chaque index du state value (là où sont stockée les données) pour boucler sur l'index et
        additionner les données de chaque étapes pour ensuite faire la moyenne de chaque étape.

        Ensuite la fonction appelle l'API et lui envoie les données pour les stockées sur la base de données.
    */
    const send = async () => {
        let globalGroup1 = 0;
        let globalGroup2 = 0;
        let globalGroup3 = 0;
        let globalGroup4 = 0;
        values[0].map((value) => {
            return globalGroup1 += Number(value);

        });
        if (values[1]) {
            values[1].map((value) => {
                return globalGroup2 += Number(value);
            });
        }

        // Si on à un troisième groupe (firstWeek)
        if (values[2]) {
            values[2].map((value) => {
                return globalGroup3 += Number(value);
            })
        }

        if (values[3]) {
            values[3].map((value) => {
                return globalGroup4 += Number(value);
            })
        }

        // Moyenne de la première étape
        let group1 = (globalGroup1 * 2) / values[0].length;

        // Moyenne de la deuxième étape
        let group2 = (globalGroup2 * 2) / values[1].length;

        // Si on à un troisième groupe (firstWeek)
        let group3 = 0;
        if (values[2]) {
            group3 = (globalGroup3 * 2) / values[2].length;
        }

        let group4 = 0;
        if (values[3]) {
            group4 = (globalGroup4 * 2) / values[3].length;
        }

        // Moyenne générale
        let general = (group1 + group2 + group3 + group4) / values.length

        await API.postData({general, group1, group2, group3})
            .then(() => {
                window.location = '/home'
            })
            .catch(error => {
                console.log(error.response.data.text);
            })
    }

    /*
        Cette fonction permet d'ajouter et de stocker les données des réponses dans le state values.
    */
    const handleChange = event => {
        const index = Number(event.target.name);
        let newValues = values.slice();
        newValues[steps][index] = event.target.value;
        setValues(newValues)
    }

    // Cette fonction permet de passer à l'étape suivante lorsque l'utilisateur à fini de répondre aux question de l'étape actuelle
    const nextStep = () => {
        document.querySelector('.content-container').scrollIntoView({
            behavior: 'smooth'
        });
        if (steps + 1 !== form.length) {
            if (values[steps].length === form[steps][0].length) {
                setErrorNotFull("");
                setSteps(steps + 1);
            } else {
                setErrorNotFull("Merci de répondre à toutes les questions");
            }
        }
    }

    // Cette fonction permet de reculer d'une étape si l'utilisateur le souhaite (pour vérifier ses réponses par exemple)
    const previousStep = () => {
        document.querySelector('.content-container').scrollIntoView({
            behavior: 'smooth'
        });
        if (steps !== 0) {
            setErrorNotFull("");
            setSteps(steps - 1);
        }
    }

    /*
        Cette fonction permet de vérifié que l'utilisateur à bien répondu à toutes les questions de la dernière étape
        et si tout est validé de lancer la fonction send qui traite et envoie les données.
    */
    const handleSubmit = event => {
        if (steps + 1 === form.length) {
            if (values[steps].length !== form[steps][0].length) {
                event.preventDefault();
                document.querySelector('.content-container').scrollIntoView({
                    behavior: 'smooth'
                });
                setErrorNotFull("Merci de répondre à toutes les questions");
            } else {
                event.preventDefault();
                send();
            }
        } else {
            event.preventDefault();
        }
    }

    // Cette fonciont permet de récupérer les questions du formulaire et de les formatées
    getForm(completeForm, form)

    while (!form.length) {
        return (
            <div className='loading-container'>
                <p className='loading'>Chargement...</p>
            </div>
        )
    }
    return (
        <form onSubmit={handleSubmit} className='form-anchor'>
            <GetGroup form={form} error={errorNotFull} steps={steps} values={values} handleChange={handleChange}
                      nextStep={nextStep} previousStep={previousStep} handleSubmit={handleSubmit}/>
        </form>
    )

}
