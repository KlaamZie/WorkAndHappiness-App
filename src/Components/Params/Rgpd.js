import React, {useState, useEffect} from 'react';

import Checkbox from '@material-ui/core/Checkbox';

import API from "../../utils/Params";

export default function Rgpd(props) {

    const [weeklyMail, setWeeklyMail] = useState(false);
    const [monthlyMail, setMonthlyMail] = useState(false);

    // Définition des states
    useEffect(() => {
        setWeeklyMail(props.user.weeklyMail);
        setMonthlyMail(props.user.monthlyMail);
    }, [props.user.monthlyMail, props.user.weeklyMail])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await API.changeRgpd({weeklyMail, monthlyMail});
        } catch (error) {
            alert(error.response.data.text);
            return;
        }

        alert('Les changements ont bien été pris en compte !');
    };

    return (
        <div className="rgpd-container">
            <h1>Paramètres de Confidentialités</h1>
            <form onSubmit={handleSubmit} className='rgpd-form'>
                <div className="rgpd-items">
                    <label>J'accepte de recevoir chaque semaine un mail m'informant des nouveautés de la
                        semaine.</label>
                    <Checkbox
                        id="weeklyMail"
                        checked={weeklyMail}
                        onChange={e => setWeeklyMail(e.target.checked)}
                        color="primary"
                    />
                </div>
                <div className="rgpd-items">
                    <label>J'accepte de recevoir chaque mois un mail m'informant de ma progression ainsi que des
                        nouveautés de l'application.</label>
                    <Checkbox
                        id="monthlyMail"
                        checked={monthlyMail}
                        onChange={e => setMonthlyMail(e.target.checked)}
                        color="primary"
                    />
                </div>
                <input type="submit" value="Valider"/>
            </form>
        </div>
    );

}
