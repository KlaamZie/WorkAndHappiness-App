/*
	Ce composant correspond a l'accueil, sur l'application c'est la page qui affiche les données de bien-être
	de l'entreprise.

	On récupère tout d'abord les données de l'entreprise dans le context pour pouvoir les affichées.

	La seule spécificitée se trouve à la ligne "if(entreprise.firstweek)", on regarde si c'est la première semaine de
	l'entreprise sur l'application, si c'est le cas on affiche les données de la semaine au lieu des données du mois qui
	n'existent pas encore enfin pour éviter un erreur d'affichage si le champ "general" qui correspond à la moyenne générale
	est vide on met tout les champs à 0 car si celui-ci est vide tous les autres sont vide aussi.

	Pour afficher la moyenne on utilise un sous-composant appellé simplement Moyenne se trouvant dans le dossier "UI".
	On passe à ce composant un titre (le type de moyenne affichée) et la moyenne que l'on veux lui attribuer.

	Pour afficher les graphiques cela est plus technique nous verrons donc ça directement dans le composant "Graph".
*/

import React, {useContext} from 'react';
import Context from '../../Context/Context';

import Moyenne from '../../UI/Moyenne';
import Graph from './Graph';

export default function Home(props) {
    const {entreprise} = useContext(Context);

    while (!entreprise.healthData && !entreprise.chart) {
        return (
            <div className='content-container loading-container'>
                <p className='loading'>Chargement...</p>
            </div>
        )
    }

    let data = entreprise.healthData;

    if (entreprise.firstWeek) {
        let firstWeekData = entreprise.monthlyData;
        data = {
            general: (firstWeekData.general / firstWeekData.divider).toFixed(1),
            group1: (firstWeekData.group1 / firstWeekData.dividerGroup1).toFixed(1),
            group2: (firstWeekData.group2 / firstWeekData.dividerGroup2).toFixed(1),
            group3: (firstWeekData.group3 / firstWeekData.dividerGroup3).toFixed(1)
        }
        if (!data.general) {
            data = {
                general: 0,
                group1: 0,
                group2: 0,
                group3: 0
            }
        }
    }

    return (
        <div className='content-container'>
            <p className="indicator">Compte rendu du bien-être au travail dans votre entreprise</p>
            <div className="moyenne-container">
                <Moyenne title={"Générale"} data={data.general}/>
                <Moyenne title={"Santé"} data={data.group1}/>
                <Moyenne title={"Exigences et capacités"} data={data.group2}/>
                <Moyenne title={"Environnement"} data={data.group3}/>
            </div>
            <div className="graph-container">
                <Graph/>
            </div>
        </div>
    );

}
