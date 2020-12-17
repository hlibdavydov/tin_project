import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import '../../CSS/Drugs/DrugsTable.css'

const DrugsTable = () => {
    const {t} = useTranslation();
    const [drugs, setDrugs] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:5001/api/drugs')
            .then(response => {
                setDrugs(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    const deleteDrug = (id) => {
        axios.delete('https://localhost:5001/api/drugs/' + id)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <table className='drugsTable'>
                <tr>
                    <th>{t('drugName')}</th>
                    <th>{t('producer')}</th>
                    <th>{t('actions')}</th>
                </tr>
                {drugs.map(drug => (
                    <tr key={drug.id}>
                        <td>{drug.name}</td>
                        <td>{drug.producer}</td>
                        <td className='drugTableButtons'>
                            <Link className='details' to={"/drugs/details/" + drug.id}>{t('details')}</Link>
                            <button className='delete' onClick={() => deleteDrug(drug.id)}>{t('delete')}</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
export {DrugsTable};