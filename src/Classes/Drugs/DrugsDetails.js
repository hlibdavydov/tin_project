import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {useTranslation} from "react-i18next";
const DrugsDetails = () =>{
    const {id} = useParams();
    const {t} = useTranslation();
    const [infoAboutDrug, setInfoAboutDrug] = useState({name:'', producer:'', description:''})
    useEffect(()=>{
        axios.get('https://localhost:5001/api/drugs/' + id)
            .then(response =>{
                setInfoAboutDrug({name:response.data.name, producer: response.data.producer, description: response.data.description})
            })
            .catch(error =>{
                console.log(error);
            })
    },[])
    return (
        <div>
            <h1>{t('detailsOf') + ': ' + infoAboutDrug.name}</h1>
            <h1>Name</h1>
            <p>{infoAboutDrug.name}</p>
            <h1>Producer</h1>
            <p>{infoAboutDrug.producer}</p>
            <h1>Description</h1>
            <p>{infoAboutDrug.description}</p>
            <Link to='/drugs'>{t('back')}</Link>
        </div>
    );
}
export {DrugsDetails};