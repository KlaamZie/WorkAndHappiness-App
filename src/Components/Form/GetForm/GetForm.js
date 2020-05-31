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

    const handleChange = event => {
        const index = Number(event.target.name);
        let newValues = values.slice();
        newValues[steps][index] = event.target.value;
        setValues(newValues)
    }

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

    const previousStep = () => {
        document.querySelector('.content-container').scrollIntoView({
            behavior: 'smooth'
        });
        if (steps !== 0) {
            setErrorNotFull("");
            setSteps(steps - 1);
        }
    }

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
                //  window.location = '/home';
            }
        } else {
            event.preventDefault();
        }
    }

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
