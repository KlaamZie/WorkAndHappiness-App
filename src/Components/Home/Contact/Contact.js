import React from 'react';
import axios from 'axios';
import './Contact.css';

const burl = "https://api.workandhappiness.fr";

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            contacts: [],
        }
    }

    componentDidMount() {
        const uid = localStorage.getItem('06061998');
        axios.get(`${burl}/user/getcontact/${uid}`)
            .then(response => {
                this.setState({ contacts: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });

        axios.get(`${burl}/user/getname/${uid}`)
            .then(response => {
                axios.get(`${burl}/entreprise/getcontact/${response.data.idEntreprise}`)
                    .then(response => {
                        let userContacts = this.state.contacts.slice();
                        let entrepriseContacts = response.data.contacts;
                        let contacts = userContacts.concat(entrepriseContacts);
                        this.setState({ contacts });
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    tri(a, b) {
        if (a.firstname < b.firstname) return -1;
        else if (a.firstname === b.firstname) return 0;
        else return 1;
    }

    render() {

        let contacts = this.state.contacts;
        contacts.sort(this.tri);
        const listContacts = contacts.map((contact) =>
            <div key={contact._id} className='item-contact'>
                <h3>{contact.firstname} {contact.lastname}</h3>
                <p>Email : {contact.email}</p>
                <p>Téléphone : {contact.phone}</p>
            </div>
        );

        return (
            <div className="contact-container">
                <section className='contact-title'>
                    <h2>Liste de contact</h2>
                    <a href='/params' className='add-contact'>
                        <i className="material-icons">person_add</i>
                    </a>
                </section>
                <section className='contact-list'>{listContacts}</section>
            </div>
        )
    };
};

export default Contact;
