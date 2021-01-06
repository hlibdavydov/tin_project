import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";
import {TextField} from "../DataValidation/Field";
import axios from "axios";
import {SessionContext} from "../../App";

const DrugAddingForm = () => {
    const {t} = useTranslation();
    const [showAddingForm, setShowAddingForm]= useState(false);
    const [name, setName] = useState('');
    const [producer, setProducer] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [producerError, setProducerError] = useState('');
    const [descriptionError,setDescriptionError] = useState('');
    const [user] = useContext(SessionContext);

   const changeNameValue = event =>{
       let value = event.target.value;
       const nameField = new TextField(value);
       setNameError('');
       try{
           nameField.checkRequirements();
       }catch (e) {
           setNameError(e);
       }
       setName(value);
    }
   const changeDescriptionValue = event =>{
       let value = event.target.value;
       const descriptionField = new TextField(value);
       setDescriptionError('');
       try{
           descriptionField.checkRequirements();
       }catch (e) {
           setDescriptionError(e);
       }
       setDescription(value);
    }
   const changeProducerValue = event =>{
       let value = event.target.value;
       const producerField = new TextField(value);
       setProducerError('');
       try{
           producerField.checkRequirements();
       }catch (e) {
           setProducerError(e);
       }
       setProducer(value);
    }
    const addNewDrug = event =>{
        event.preventDefault();
        const nameField = new TextField(name);
        const producerField = new TextField(producer);
        const descriptionField = new TextField(description);
        try{
            nameField.checkRequirements();
            producerField.checkRequirements();
            descriptionField.checkRequirements();
        }catch (e) {
            console.log(e);
            return false;
        }
        let headers = {
            "Name": name,
            "Producer": producer,
            "Description": description
        }
        axios.post('https://localhost:5001/api/drugs/add', headers, {
            headers:{
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        return true;
    }
    return (
        <div>
            <button onClick={() => setShowAddingForm(!showAddingForm)}>
                {showAddingForm ?
                    t('hideAddDrugForm')
                    :
                    t('showAddDrugForm')
                }
            </button>
            {showAddingForm &&
            <div>
                <form onSubmit={addNewDrug}>
                    <label>{t('name')}</label>
                    <input type='text' value={name} onChange={changeNameValue}/>
                    <span className='error-text'>{nameError}</span>
                    <label>{t('producer')}</label>
                    <input type='text' value={producer} onChange={changeProducerValue}/>
                    <span className='error-text'>{producerError}</span>
                    <label>{t('description')}</label>
                    <textarea value={description} onChange={changeDescriptionValue}/>
                    <span className='error-text'>{descriptionError}</span>
                    <button className='submit' type='submit'>{t('addDrug')}</button>
                </form>
            </div>
            }
        </div>
    );


}
export {DrugAddingForm}