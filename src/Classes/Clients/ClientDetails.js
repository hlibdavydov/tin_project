import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {useTranslation} from "react-i18next";
import '../../CSS/Drugs/DrugsDetails.css'
import {SessionContext} from "../../App";

const ClientDetails = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [editingDisabled, setEditingDisable] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [user, setUser] = useContext(SessionContext);

    useEffect(() => {
            axios.get('https://localhost:5001/api/clients/' + id, {
                headers:{
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setDateOfBirth((response.data.dateOfBirth));
                    console.log(dateOfBirth)
                })
                .catch(error => {
                    console.log(error);
                })
        }, []
    )
    const updateClientInformation = () => {
        let headers = {
            "Id": id,
            "FirstName": firstName,
            "LastName": lastName,
            "DateOfBirth": dateOfBirth
        }
        axios.put('https://localhost:5001/api/clients', headers, {
            headers:{
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then(response => {
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
                <h2>{t('firstName')}</h2>
                <input name="firstName" disabled={editingDisabled} type='text' value={firstName}
                       onChange={event => setFirstName(event.target.value)}/>
                <h2>{t('lastName')}</h2>
                <input name="lastName" disabled={editingDisabled} type='text' value={lastName}
                       onChange={event => setLastName(event.target.value)}/>
                <h2>{t('dateOfBirth')}</h2>
                <input type='date' disabled={editingDisabled} value={dateOfBirth}
                          onChange={event => setDateOfBirth(event.target.value)}/>
            </div>
            <Link className='details' to='/clients'>{t('back')}</Link>
            {editingDisabled ?
                <button className='edit' onClick={() => {
                    setEditingDisable(false)
                }}>{t('edit')}</button>
                :
                <button className='saveButton' onClick={updateClientInformation}>{t('save')}</button>
            }
        </div>
    );
}
export {ClientDetails};