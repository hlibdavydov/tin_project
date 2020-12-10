import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {DrugsTable} from "./DrugsTable";

const Drugs = () => {
    const {t} = useTranslation();
    return (
        <div>
            <h1>{t('drugs')}</h1>
            <DrugsTable/>
        </div>
    )
}
export {Drugs};