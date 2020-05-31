import React, {useState, useEffect} from 'react';
import API from "../../utils/Params";
import axios from "axios";
import {useCookies} from "react-cookie";

export default function Infos(props) {

    const [cookies] = useCookies(['_060698', '_031098']);

    const [waitingEntreprise, setWaitingEntreprise] = useState("");
    const [changeEntreprise, setChangeEntreprise] = useState("");
    const [error, setError] = useState("");
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (props.user.waitingEntreprise !== 0 && !waitingEntreprise) {
            const burl = "https://api.workandhappiness.fr";
            let authorization = 'Bearer ' + cookies._060698
            let refresh = cookies._031098
            axios.get(`${burl}/waitingentreprise`, {headers: {Authorization: authorization, Refresh: refresh}})
                .then(response => {
                    setWaitingEntreprise(response.data.name)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });

    let modal = document.getElementById("myModal");

    window.onclick = function (event) {
        if (event.target === modal) {
            if (isChanged) {
                window.location.reload();
            }
            modal.style.display = "none";
            setChangeEntreprise('');
        }
    }

    const displayModal = () => {
        modal.style.display = "flex";
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let reg = /^-?\d+\.?\d*$/
        if (!changeEntreprise.match(reg)) {
            return setError("L'identifiant ne doit contenir que des chiffres !")
        }

        let previousEntrepriseId = props.entreprise._id;
        let newEntrepriseId = changeEntreprise;

        try {
            await API.changeEntreprise({previousEntrepriseId, newEntrepriseId});
        } catch (error) {
            setError(error.response.data.text);
            return;
        }

        setIsChanged(true);
    }

    return (

        <div className="infos-container">
            <h1>Vos informations personnelles</h1>
            <div className="infos-content-container">
                <p><strong>Nom :</strong> {props.user.lastname}</p>
                <p><strong>Prénom :</strong> {props.user.firstname}</p>
                <p><strong>Adresse mail :</strong> {props.user.email}</p>
                <div className="change-entreprise">
                    {
                        props.user.waitingEntreprise !== 0 ?
                            <p><strong>Entreprise :</strong> {waitingEntreprise} <span
                                className="infos-span">(en attente de validation)</span></p>
                            :
                            <p><strong>Entreprise :</strong> {props.entreprise.name}</p>
                    }
                    <i className="material-icons change-entreprise-icons" onClick={displayModal}>create</i>
                </div>

                {/* Création de la modale */}
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <h1>Changement d'entreprise</h1>
                        <p>Vous pouvez changer d'entreprise en tapant l'Identifiant de votre nouvelle entreprise
                            ci-dessous.<br/><span className="modal-span">Attention cette action vous fera perdre tous vos droits d'administration ou de modération.</span>
                        </p>
                        {error ? <p className="error">{error}</p> : null}
                        {!isChanged ?
                            <form onSubmit={handleSubmit}>
                                <input
                                    id="newEntreprise"
                                    type="text"
                                    placeholder="ID de la nouvelle entreprise"
                                    value={changeEntreprise}
                                    onChange={e => setChangeEntreprise(e.target.value)}
                                />
                                <input type="submit" value="Valider"/>
                            </form>
                            :
                            <div>
                                <p>Les changements ont bien été pris en compte !</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    );

}
