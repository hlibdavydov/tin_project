import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import PrescriptionTable from "./PrescriptionsTable"
import PrescriptionForm from "./PrescriptionsForm";
import '../../Translations/translate';

 const PrescriptionFilterContext = React.createContext([{}, valuesOfTheFields => {}]);
 const Prescription = () => {
    const {t} = useTranslation();
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [filterByOptions, setFilterByOptions] = useState({selectDoctor:'all', selectClient:'all', selectDrug:'all',dateFrom:'all', dateTo:'all'});
    return (
        <PrescriptionFilterContext.Provider value={[filterByOptions, setFilterByOptions]}>
            <h1>{t("prescriptions")}</h1>
            <button
                onClick={() => setShowPrescriptionForm(!showPrescriptionForm)}>{showPrescriptionForm ? t('hideSearchByForm') : t('showSearchByForm')}</button>
            {showPrescriptionForm &&
            <PrescriptionForm/>
            }
            <PrescriptionTable/>
        </PrescriptionFilterContext.Provider>
    );
}

export {Prescription, PrescriptionFilterContext};
