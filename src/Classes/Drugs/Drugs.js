import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {DrugsTable} from "./DrugsTable";
import {DrugAddingForm} from "./DrugAddingForm";

const Drugs = () => {
    const {t} = useTranslation();
    return (
        <div>
            <h1>{t('drugs')}</h1>
            <DrugAddingForm/>
            <DrugsTable/>
        </div>
    )
}
export {Drugs};