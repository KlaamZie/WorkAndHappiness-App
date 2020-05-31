import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import GetButton from './GetButton';

export default function GetGroup(props) {

	let groupLabel = [];
	let groupMarks = [];

	if (props.form.length) {

		if (!props.values.length) {
			while (props.values.length < props.form.length) {
				props.values.push([]);
			}
		}

		let group = props.form[props.steps];

		groupLabel = group[0].slice();
		groupMarks = group[1].slice();

		if (!props.error) {
			return (<div>
				<h1 className="step">Étape {props.steps + 1}</h1>

				{groupLabel.map((labels, i) => {

					return (
						<div key={i} className="group-items">
							<label className="group-label">{`Q${i + 1}. ${labels}`}</label>
							<RadioGroup aria-label={i.toString()} name={i.toString()} onChange={props.handleChange} value={Number(props.values[props.steps][i])}>
								<FormControlLabel
									value={groupMarks[0].value}
									control={<Radio color="primary"/>}
									label={groupMarks[0].label}
									className="mark"
									/>
								<FormControlLabel
									control={<Radio color="primary"/>}
									value={groupMarks[1].value}
									label={groupMarks[1].label}
									className="mark"
									/>
								<FormControlLabel
									value={groupMarks[2].value}
									control={<Radio color="primary"/>}
									label={groupMarks[2].label}
									className="mark"
									/>
								<FormControlLabel
									value={groupMarks[3].value}
									control={<Radio color="primary"/>}
									label={groupMarks[3].label}
									className="mark"
									/>
								<FormControlLabel
									value={groupMarks[4].value}
									control={<Radio color="primary"/>}
									label={groupMarks[4].label}
									className="mark"
									/>
							</RadioGroup>
						</div>
					)
				})}

				<GetButton steps={props.steps} form={props.form} previousStep={props.previousStep} nextStep={props.nextStep} handleSubmit={props.handleSubmit} />
			</div>)
		}

		else {
			return (<div>
				<h1 className="step">Étape {props.steps + 1}</h1>
				<p className="error">{props.error}</p>

				{groupLabel.map((labels, i) => {

					return (
						<div key={i} className="group-items">
							<label className="group-label">{`Q${i + 1}. ${labels}`}</label>
							<RadioGroup aria-label={i.toString()} name={i.toString()} onChange={props.handleChange} value={Number(props.values[props.steps][i])}>
								<FormControlLabel
									value={groupMarks[0].value}
									control={<Radio />}
									label={groupMarks[0].label}
									className="mark"
									/>
								<FormControlLabel
									control={<Radio />}
									value={groupMarks[1].value}
									label={groupMarks[1].label}
									className="mark"
									/>
								<FormControlLabel
									value={groupMarks[2].value}
									control={<Radio />}
									label={groupMarks[2].label}
									className="mark"
									/>
								<FormControlLabel
									value={groupMarks[3].value}
									control={<Radio />}
									label={groupMarks[3].label}
									className="mark"
									/>
								<FormControlLabel
									value={groupMarks[4].value}
									control={<Radio />}
									label={groupMarks[4].label}
									className="mark"
									/>
							</RadioGroup>
						</div>
					)
				})}

				<GetButton steps={props.steps} form={props.form} previousStep={props.previousStep} nextStep={props.nextStep} handleSubmit={props.handleSubmit} />
			</div>)
		}
	}
}
