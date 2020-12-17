import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../CSS/Drugs/DrugsDetails.css'


const DoctorDetails = () =>{
    const {id} = useParams();
    const {t} = useTranslation();
    const [editingDisabled, setEditingDisable] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
            axios.get('https://localhost:5001/api/doctors/' + id)
                .then(response => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.log(error);
                })
        }, []
    )
    const updateDrugInformation = () => {
        let headers = {
            "Id": id,
            "FirstName": firstName,
            "LastName": lastName,
            "Email": email
        }
        axios.put('https://localhost:5001/api/doctors', headers).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        setEditingDisable(true);
    }
    return (
        <div>
            <h1>{t('detailsOf') + ': ' + firstName}</h1>
            {editingDisabled ?
                <h2 className='viewingMode'>{t('Viewing mode')}</h2>
                :
                <h2 className='editingMode'>{t('Editing mode')}</h2>
            }
            <div className='drugsDetails'>
                <h2>First Name</h2>
                <input name='drugName' disabled={editingDisabled} type='text' value={firstName}
                       onChange={event => setFirstName(event.target.value)}/>
                <h2>Last Name</h2>
                <input name='producerTextField' disabled={editingDisabled} type='text' value={lastName}
                       onChange={event => setLastName(event.target.value)}/>
                <h2>Email</h2>
                <input type='text' disabled={editingDisabled} value={email}
                          onChange={event => setEmail(event.target.value)}/>
            </div>
            <Link className='details' to='/doctors'>{t('back')}</Link>
            {editingDisabled ?
                <button className='edit' onClick={() => {
                    setEditingDisable(false)
                }}>{t('edit')}</button>
                :
                <button className='saveButton' onClick={updateDrugInformation}>{t('save')}</button>
            }
        </div>
    );
}
export {DoctorDetails}