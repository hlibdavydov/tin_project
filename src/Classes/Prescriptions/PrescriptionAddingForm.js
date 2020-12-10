import {useTranslation} from "react-i18next";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

const PrescriptionAddingForm = () => {
    const {t} = useTranslation();
    const [formElements, setFormElements] = useState({selectDoctor: '', selectClient: '',  selectDrug: '', selectDate: ''})
    const [clients, setClients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [searchTemplateFields, setSearchTemplateFields] = useState({
        doctorTemplate: '',
        clientTemplate: '',
        drugTemplate: ''
    })

    const addPrescription = event => {
        event.preventDefault();
        let headers = {
            "DoctorId": formElements.selectDoctor,
            "ClientId": formElements.selectClient,
            "DrugId": formElements.selectDrug,
            "Date": formElements.selectDate
        }
        axios.post('https://localhost:5001/api/prescriptions/add', headers).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        axios.get('https://localhost:5001/api/doctors').then(response => {
            setDoctors(response.data);
        });
        axios.get('https://localhost:5001/api/clients').then(response => {
            setClients(response.data);
        });
        axios.get('https://localhost:5001/api/drugs').then(response => {
            setDrugs(response.data);
        }).catch(error => console.log(error));


    }, []);
    const changeHandleTemplates = e => {
        setSearchTemplateFields({
            ...searchTemplateFields,
            [e.target.name]: e.target.value
        })
    }
    const resetFields = () => {

    }

    return (
        <div>
            <form id='prescriptionsForm' onSubmit={addPrescription}>
                <label>{t("selectDoctor")}:</label>
                <input name='doctorTemplate' type="text" placeholder={t('searchTemplate')}
                       onChange={changeHandleTemplates}/>
                <select required onChange={(event) => setFormElements(formElements=> ({
                    ...formElements,
                    selectDoctor: event.target.value
                }))}>
                    <option hidden disabled selected value> -- select an option -- </option>
                    {doctors
                        .filter(doctor => {
                            if (searchTemplateFields.doctorTemplate.empty) return true;
                            return (doctor.firstName +' '+ doctor.lastName).toLowerCase().includes(searchTemplateFields.doctorTemplate.toLowerCase());
                        })
                        .map(doctor => {
                            return (
                                <option
                                    value={doctor.id}>{doctor.firstName +' '+ doctor.lastName}</option>
                            )
                        })}
                </select>
                <label>{t("selectClient")}:</label>
                <input name='clientTemplate' type="text" placeholder={t('searchTemplate')}
                       onChange={changeHandleTemplates}/>
                <select required onChange={(event) => setFormElements(formElements=> ({
                    ...formElements,
                    selectClient: event.target.value
                }))}>
                    <option hidden disabled selected value> -- select an option -- </option>
                    {clients.filter(client => {
                        if (searchTemplateFields.clientTemplate === '') return true;
                        return (client.firstName + ' ' +client.lastName).toLowerCase().includes(searchTemplateFields.clientTemplate.toString().toLowerCase());
                    }).map(client => {
                        return (
                            <option value={client.id}>{client.firstName + ' ' +client.lastName}</option>
                        )
                    })}
                </select>
                <label>{t("selectDrug")}:</label>
                <input name='drugTemplate' type="text" placeholder={t('searchTemplate')}
                       onChange={changeHandleTemplates}/>
                <select required onChange={(event) => setFormElements(formElements=> ({
                    ...formElements,
                    selectDrug: event.target.value
                }))}>
                    <option hidden disabled selected value={"none"}> -- select an option -- </option>
                    {drugs.filter(drug => {
                        if (searchTemplateFields.drugTemplate.empty) return true;
                        return drug.name.toLowerCase().includes(searchTemplateFields.drugTemplate);
                    })
                        .map((drug,index) => {
                            const name = drug.name;
                            return (
                                <option  value={drug.id}>{name}</option>
                            )
                        })}
                </select>
                <label>{t('date')}</label>
                <input required name='date' type="date" onChange={(event) => setFormElements(formElements=> ({
                    ...formElements,
                    selectDate: event.target.value
                }))}/>
                <div/>
                <div/>
                <Button className="submit" type="submit">{t("add")}</Button>;
            </form>
        </div>
    );

}
export {PrescriptionAddingForm};