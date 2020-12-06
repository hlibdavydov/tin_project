import {useTranslation} from "react-i18next";
import PrescriptionTable from "./PrescriptionsTable";
import React from "react";
import {Button} from "react-bootstrap";
import '../../CSS/Prescription/PrescriptionsForm.css'
export const PrescriptionForm = () =>{
    const { t } = useTranslation();
    return (
        <div>
            <form id='prescriptionsForm'>
                <label>{t("selectDoctor")}:</label>
                {/*<input name='doctorName' type="text" placeholder='enter value'/>*/}
                <select name="selectDoctorForm">
                    <option value="daniel">Daniel</option>
                    <option value="stefan">Stefan</option>
                    <option value="piotr">Piotr</option>
                </select>
                <label>{t("selectClient")}:</label>
                <select name="selectClientForm">
                    <option selected value> -- select an option -- </option>
                    <option value="daniel">Klient1</option>
                    <option value="stefan">Klient2</option>
                    <option value="piotr">Klient3</option>
                </select>
                <label>{t("selectDrug")}:</label>
                <select name="selectClientForm">
                    <option value="daniel">Drug1</option>
                    <option value="stefan">Drug2</option>
                    <option value="piotr">Drug3</option>
                </select>
                <label>{t('dateFrom')}</label>
                <input name='dateFrom' type="date"/>
                <label>{t('dateTo')}</label>
                <input name='dateTo' type="date"/>
                <Button className="filter" type="submit">{t("filter")}</Button>;
            </form>
        </div>
    );
}

export default PrescriptionForm;