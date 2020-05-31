import React, {useContext, useState} from 'react';
import Context from '../../Context/Context';
import API from "../../utils/Auth";

import './MailValidation.scss';

export default function MailValidation(props) {

    const {user} = useContext(Context);

    // Définition des states
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || email.length === 0) return;

        await API.validEmail(email)
            .then(response => {
                alert(response.data.text);
                window.location = "/home";
            })
            .catch(error => {
                alert(error.response.data.text);
            });
    };

    if (user.validEmail) {
        window.location = "/home";
    }

    return (
        <div className="content-container">
            <form onSubmit={handleSubmit} className='mailValidation-form'>
                <div className="mailValidation-fields">
                    <label>Merci de rentrer votre adresse mail afin de la valider</label>
                    <input
                        placeholder="Adresse mail"
                        id="email"
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mailValidation-bottom">
                    <input type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    )

}
