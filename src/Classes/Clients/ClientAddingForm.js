import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";
import {DateField, TextField} from "../DataValidation/Field";
import axios from "axios";

const ClientAddingForm = () => {
    const {t} = useTranslation();
    const [showAddingForm, setShowAddingForm]= useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [dateOfBirthError,setDateOfBirthError] = useState('');

   const changeFirstNameValue = event =>{
       let value = event.target.value;
       const nameField = new TextField(value);
       setFirstNameError('');
       try{
           nameField.checkRequirements();
       }catch (e) {
           setFirstNameError(e);
       }
       setFirstName(value);
    }
   const changeDateOfBirthValue = event =>{
       let value = event.target.value;
       const descriptionField = new DateField(value, true);
       setDateOfBirthError('');
       try{
           descriptionField.checkRequirements();
       }catch (e) {
           setDateOfBirthError(e);
       }
       setDateOfBirth(value);
    }
   const lastNameValue = event =>{
       let value = event.target.value;
       const lastNameField = new TextField(value);
       setLastNameError('');
       try{
           lastNameField.checkRequirements();
       }catch (e) {
           setLastNameError(e);
       }
       setLastName(value);
    }
    const addNewClient = event =>{
        event.preventDefault();
        const nameField = new TextField(firstName);
        const producerField = new TextField(lastName);
        const descriptionField = new DateField(dateOfBirth, true);
        try{
            nameField.checkRequirements();
            producerField.checkRequirements();
            descriptionField.checkRequirements();
        }catch (e) {
            console.log(e);
            return false;
        }
        let headers = {
            "FirstName": firstName,
            "LastName": lastName,
            "DateOfBirth": dateOfBirth
        }
        axios.post('https://localhost:5001/api/clients/add', headers).then(response => {
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
                    t('hideAddClientForm')
                    :
                    t('showAddClientForm')
                }
            </button>
            {showAddingForm &&
            <div>
                <form onSubmit={addNewClient}>
                    <label>{t('firstName')}</label>
                    <input type='text' value={firstName} onChange={changeFirstNameValue}/>
                    <span className='error-text'>{firstNameError}</span>
                    <label>{t('lastName')}</label>
                    <input type='text' value={lastName} onChange={lastNameValue}/>
                    <span className='error-text'>{lastNameError}</span>
                    <label>{t('dateOfBirth')}</label>
                    <input type='date' value={dateOfBirth} onSelect={changeDateOfBirthValue} onChange={changeDateOfBirthValue}/>
                    <span className='error-text'>{dateOfBirthError}</span>
                    <button className='submit' type='submit'>{t('addDrug')}</button>
                </form>
            </div>
            }
        </div>
    );


}
export {ClientAddingForm}