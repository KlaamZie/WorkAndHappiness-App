import React, { useContext } from 'react';

import GetForm from './GetForm/GetForm';
import './Form.scss';

import Context from '../../Context/Context';

export default function Form() {

	const { user } = useContext(Context);

	if (!user.answerThisWeek) {
		return (
			<div className='content-container'>
				<div className="form-container">
					<GetForm />
				</div>
			</div>
		)
	}
	else {
		return (
			<div className='content-container'>
				<div className="form-container already-answer">
					<h1>Vous avez déjà répondu cette semaine.</h1>
					<h2>Nous vous enverrons un mail dès que le prochain questionnaire sera en ligne !</h2>
				</div>
			</div>
		)
	};

}
