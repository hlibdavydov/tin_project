import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {useTranslation} from "react-i18next";
import '../../CSS/Drugs/DrugsDetails.css'

const DrugsDetails = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [editingDisabled, setEditingDisable] = useState(true);
    const [drugName, setDrugName] = useState('');
    const [drugProducer, setDrugProducer] = useState('');
    const [drugDescription, setDrugDescription] = useState('');
    useEffect(() => {
            axios.get('https://localhost:5001/api/drugs/' + id)
                .then(response => {
                    setDrugName(response.data.name);
                    setDrugProducer(response.data.producer);
                    setDrugDescription(response.data.description);
                })
                .catch(error => {
                    console.log(error);
                })
        }, []
    )
    const updateDrugInformation = () => {
        let headers = {
            "Id": id,
            "Name": drugName,
            "Producer": drugProducer,
            "Description": drugDescription
        }
        axios.put('https://localhost:5001/api/drugs', headers).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        setEditingDisable(true);
    }
    return (
        <div>
            <h1>{t('detailsOf') + ': ' + drugName}</h1>
            {editingDisabled ?
                <h2 className='viewingMode'>{t('viewingMode')}</h2>
                :
                <h2 className='editingMode'>{t('editingMode')}</h2>
            }
            <div className='drugsDetails'>
                <h2>{t('name')}</h2>
                <input name='drugName' disabled={editingDisabled} type='text' value={drugName}
                       onChange={event => setDrugName(event.target.value)}/>
                <h2>{t('producer')}</h2>
                <input name='producerTextField' disabled={editingDisabled} type='text' value={drugProducer}
                       onChange={event => setDrugProducer(event.target.value)}/>
                <h2>{t('description')}</h2>
                <textarea disabled={editingDisabled} value={drugDescription}
                          onChange={event => setDrugDescription(event.target.value)}/>
            </div>
            <Link className='details' to='/drugs'>{t('back')}</Link>
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
export {DrugsDetails};