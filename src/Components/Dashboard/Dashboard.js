import React, { useContext } from 'react';
import Context from '../../Context/Context';

import Moyenne from '../../UI/Moyenne';
import Graph from './Graph';

export default function Dashboard(props) {

	const { user, entreprise } = useContext(Context);

	while (!user.healthData && !user.chart) {
		return (
			<div className='content-container loading-container'>
				<p className='loading'>Chargement...</p>
			</div>
		)
	}

	let data = user.healthData;
	if(entreprise.firstWeek){
		let firstWeekData = user.monthlyData;
		data = {
			general: (firstWeekData.general / firstWeekData.divider).toFixed(1),
			group1: (firstWeekData.group1 / firstWeekData.dividerGroup1).toFixed(1),
			group2: (firstWeekData.group2 / firstWeekData.dividerGroup2).toFixed(1),
			group3: (firstWeekData.group3 / firstWeekData.dividerGroup3).toFixed(1)
		}
		if(!data.general){
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
			<p className="indicator">Compte rendu de votre bien-être au travail</p>
			<div className="moyenne-container">
				<Moyenne title={"Générale"} data={data.general} />
				<Moyenne title={"Santé"} data={data.group1} />
				<Moyenne title={"Exigences et capacités"} data={data.group2} />
				<Moyenne title={"Environnement"} data={data.group3} />
			</div>
			<div className="graph-container">
				<Graph />
			</div>
		</div>
	);
}
