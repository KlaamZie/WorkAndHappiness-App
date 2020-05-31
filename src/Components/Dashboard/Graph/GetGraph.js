import React, { useContext, useEffect, useRef } from 'react';
import Context from '../../../Context/Context';
import Chart from 'chart.js';

export default function GetGraph(props) {
	const { user } = useContext(Context);
	const refContainer = useRef();

	let chart = user.chart;

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
				responsive: true,
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
