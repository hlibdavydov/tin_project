import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import '../../CSS/Drugs/DrugsTable.css'

const ClientsTable = () => {
    const {t} = useTranslation();
    const [clients, setClients] = useState([]);

    const loadClients = () => {
        axios.get('https://localhost:5001/api/clients')
            .then(response => {
                setClients(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        loadClients();
    }, []);
    const deleteClient = (id) => {
        axios.delete('https://localhost:5001/api/clients/' + id)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        loadClients()
    }
    return (
        <div>
            <table className='drugsTable'>
                <tr>
                    <th>{t('firstName')}</th>
                    <th>{t('lastName')}</th>
                    <th>{t('dateOfBirth')}</th>
                    <th>{t('actions')}</th>
                </tr>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.dateOfBirth}</td>
                        <td className='drugTableButtons'>
                            <Link className='details' to={"/clients/details/" + client.id}>{t('details')}</Link>
                            <button className='delete' onClick={() => deleteClient(client.id)}>{t('delete')}</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
export {ClientsTable};