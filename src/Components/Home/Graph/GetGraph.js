/*
	Cette fonction permet de créer et retourner le graphique grâce au package ChartJs, en fonction des données récupérée
	dans le context.

	Tout d'abord on récupère les données de l'entreprise dans le context.
	Ensuite dans la variable "chart" on stocke uniquement les données nécessaires au graphiques.
	Ces données sont composées sous la forme :
		- months : un tableau contenant les nom des mois.
		- general : un tableau contenant les moyennes générales.
		- group1 : un tableau contenant les moyennes du groupe 1:
		- group2 : pareil mais pour le groupe 2
		- group3 : pareil mais pour le groupe 3

	Chaque tableau est "relié", c'est à dire que l'index 1 du tableau des mois correspondra à la moyenne générale située
	à l'index 1 du tableau des moyennes générales.
*/

import React, {useContext, useEffect, useRef} from 'react';
import Context from '../../../Context/Context';
import Chart from 'chart.js';

export default function GetGraph(props) {
    const {entreprise} = useContext(Context);
    const refContainer = useRef();

    let chart = entreprise.chart;

    let width = window.screen.width;
    let resize = false;

    if(width <= 512) {
        resize = true;
    }

    useEffect(() => {
        let chartRef = refContainer.current.getContext("2d");
        new Chart(chartRef, {
            type: 'line',
            data: {
                labels: chart.month,
                datasets: [
                    {
                        label: 'Général',
                        borderColor: '#5D38FF',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        data: chart.general
                    },
                    {
                        label: 'Santé',
                        borderColor: '#FF9C02',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        data: chart.group1
                    },
                    {
                        label: 'Exigences et capacités',
                        borderColor: '#F8385E',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        data: chart.group2
                    },
                    {
                        label: 'Environnement',
                        borderColor: '#4F5C6E',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        data: chart.group3
                    }
                ]
            },
            options: {
                title: {
                    display: false
                },
                legend: {
                    display: true,
                    padding: resize ? 0 : 50,
                    position: resize ? 'bottom' : 'right',
                    labels: {
                        fontFamily: 'Quicksand',
                        fontSize: resize ? 10 : 14,
                        usePointStyle: true,
                        boxWidth: resize ? 4 : 10
                    }
                },
                elements: {
                    line: {
                        tension: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0)'
                    },
                    point: {
                        radius: 4,
                        borderWidth: 3,
                        hoverBorderWidth: 2
                    }
                },
                tooltips: {
                    enabled: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 10,
                            stepSize: 1
                        }
                    }]
                }
            }
        });
    })

    return (
        <canvas id="chart" ref={refContainer}></canvas>
    )
}
