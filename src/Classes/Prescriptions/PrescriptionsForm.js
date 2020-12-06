import {useTranslation} from "react-i18next";
import PrescriptionTable from "./PrescriptionsTable";
import React, {useContext, useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import '../../CSS/Prescription/PrescriptionsForm.css'
import {PrescriptionFilterContext} from './Prescription';
import axios from "axios";

export const PrescriptionForm = () => {
    const {t} = useTranslation();
    const [filterOptions, setFilterOptions] = useContext(PrescriptionFilterContext)
    const [doctors, setDoctors] = useState([]);
    const [clients, setClients] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [searchTemplateFields, setSearchTemplateFields] = useState({
        doctorTemplate: '',
        clientTemplate: '',
        drugTemplate: ''
    })

    const sendFilterOptionsSelected = event => {
        event.preventDefault();
        console.log(filterOptions);
    }
    useEffect(() => {
        axios.get('https://localhost:5001/api/doctors').then(response => {
            const doctors = response.data.map(doctor => {
                return doctor.firstName + ' ' + doctor.lastName;
            });
            setDoctors(doctors);
        });
        axios.get('https://localhost:5001/api/clients').then(response => {

            const clients = response.data.map(client => {
                return client.firstName + ' ' + client.lastName;
            });
            setClients(clients);
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
            <form id='prescriptionsForm' onSubmit={sendFilterOptionsSelected}>
                <label>{t("selectDoctor")}:</label>
                <input name='doctorTemplate' type="text" placeholder={t('searchTemplate')}
                       onChange={changeHandleTemplates}/>
                <select onChange={(event) => setFilterOptions(filterOptions => ({
                    ...filterOptions,
                    selectDoctor: event.target.value
                }))}>
                    <option value='all'>{t('all')}</option>
                    {doctors
                        .filter(doctor => {
                            if (searchTemplateFields.doctorTemplate.empty) return true;
                            return doctor.toLowerCase().includes(searchTemplateFields.doctorTemplate.toLowerCase());
                        })
                        .map(doctor => {
                            return (
                                <option
                                    value={doctor}>{doctor}</option>
                            )
                        })}
                </select>
                <label>{t("selectClient")}:</label>
                <input name='clientTemplate' type="text" placeholder={t('searchTemplate')}
                       onChange={changeHandleTemplates}/>
                <select onChange={(event) => setFilterOptions(filterOptions => ({
                    ...filterOptions,
                    selectClient: event.target.value
                }))}>
                    <option value='all'>{t('all')}</option>
                    {clients.filter(client => {
                        if (searchTemplateFields.clientTemplate === '') return true;
                        return client.toLowerCase().includes(searchTemplateFields.clientTemplate.toString().toLowerCase());
                    }).map(client => {
                        return (
                            <option value={client}>{client}</option>
                        )
                    })}
                </select>
                <label>{t("selectDrug")}:</label>
                <input name='drugTemplate' type="text" placeholder={t('searchTemplate')}
                       onChange={changeHandleTemplates}/>
                <select onChange={(event) => setFilterOptions(filterOptions => ({
                    ...filterOptions,
                    selectDrug: event.target.value
                }))}>
                    <option value='all'>{t('all')}</option>
                    {drugs.filter(drug => {
                        if (searchTemplateFields.drugTemplate.empty) return true;
                        return drug.name.toLowerCase().includes(searchTemplateFields.drugTemplate);
                    })
                        .map(drug => {
                            const name = drug.name;
                            return (
                                <option value={name}>{name}</option>
                            )
                        })}
                </select>
                <label>{t('dateFrom')}</label>
                <input name='dateFrom' type="date"/>
                <div/>
                <label>{t('dateTo')}</label>
                <input name='dateTo' type="date"/>
                <div/>
                <Button className="filter" type="submit" onClick={resetFields}>{t("reset")}</Button>;
            </form>
        </div>
    );
}
export default PrescriptionForm;