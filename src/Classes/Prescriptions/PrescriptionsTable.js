import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {PrescriptionFilterContext} from "./Prescription";

export const Recipes = () => {
    const {t} = useTranslation();
    const [rows, setRows] = useState([]);
    const [filterOptions, setFilterOptions] = useContext(PrescriptionFilterContext);
    useEffect(() => {
        axios.get('https://localhost:5001/api/prescriptions').then(response => {
            setRows(response.data);
        })
    }, []);
    return (
        <div>
            <table>
                <tr>
                    <th>{t("givenBy")}</th>
                    <th>{t("client")}</th>
                    <th>{t("drug")}</th>
                    <th>{t("date")}</th>
                </tr>
                {rows
                    .filter(value => {
                        if (filterOptions.selectDoctor === 'all') return true;
                        return value.givenByDoctor === filterOptions.selectDoctor;
                    })
                    .filter(value => {
                        if (filterOptions.selectClient === 'all') return true;
                        return value.toClient === filterOptions.selectClient;
                    })
                    .filter(value => {
                        if (filterOptions.selectDrug === 'all') return true;
                        return value.drug === filterOptions.selectDrug;
                    })
                    .map((r) => (
                        <tr>
                            <td>{r.givenByDoctor}</td>
                            <td>{r.toClient}</td>
                            <td>{r.drug}</td>
                            <td>{r.date}</td>
                        </tr>
                    ))}
            </table>

        </div>
    );
}

export default Recipes;