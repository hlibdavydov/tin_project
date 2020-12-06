import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import PrescriptionTable from "./PrescriptionsTable"
import PrescriptionForm from "./PrescriptionsForm";
import '../../Translations/translate';

export const Prescription = () => {
    const {t} = useTranslation();
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    return (
        <div>
            <h1>{t("prescriptions")}</h1>
            <button
                onClick={() => setShowPrescriptionForm(!showPrescriptionForm)}>{showPrescriptionForm ? t('hideSearchByForm') : t('showSearchByForm')}</button>
            {showPrescriptionForm &&
            <PrescriptionForm/>
            }
            <PrescriptionTable/>
        </div>
    );
}

export default Prescription;
