import React from 'react';

function GetButton(props) {
	if (props.steps + 1 === props.form.length) {
		return (
			<div className="form-button-container">
				<button className="previous-button" onClick={ props.previousStep }>Retour</button>
				<input className="next-button" type="submit" value="Valider" />
			</div>
		)
	}
	if (props.steps === 0) {
		return (
			<div className="form-button-container">
				<button className="previous-button" onClick={ props.previousStep } disabled>Retour</button>
				<button className="next-button" onClick = { props.nextStep }>Étape {props.steps + 2}</button>
			</div>
		)
	}
	if (props.steps !== 0) {
		return (
			<div className="form-button-container">
				<button className="previous-button" onClick={ props.previousStep }>Retour</button>
				<button className="next-button" onClick = { props.nextStep }>Étape {props.steps + 2}</button>
			</div>
		)
	}
}

export default GetButton;
