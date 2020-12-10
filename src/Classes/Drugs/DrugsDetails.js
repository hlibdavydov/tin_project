import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {useTranslation} from "react-i18next";
import '../../CSS/Drugs/DrugsDetails.css'

const DrugsDetails = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [infoAboutDrug, setInfoAboutDrug] = useState({name: '', producer: '', description: ''})
    useEffect(() => {
        axios.get('https://localhost:5001/api/drugs/' + id)
            .then(response => {
                setInfoAboutDrug({
                    name: response.data.name,
                    producer: response.data.producer,
                    description: response.data.description
                })
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <div>
            <h1>{t('detailsOf') + ': ' + infoAboutDrug.name}</h1>
            <div className='drugsDetails'>
                <h2>Name</h2>
                <select disabled>
                    <option>
                        {infoAboutDrug.name}
                    </option>
                </select>
                <h2>Producer</h2>
                <input name='producerTextField' disabled type='text' value={infoAboutDrug.producer}/>
                <h2>Description</h2>
                <textarea disabled value={infoAboutDrug.description}/>
            </div>
            <Link className='details' to='/drugs'>{t('back')}</Link>
            <Link className='edit' to='/drugs'>{t('edit')}</Link>
        </div>

    );
}
export {DrugsDetails};