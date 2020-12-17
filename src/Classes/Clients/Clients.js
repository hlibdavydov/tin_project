import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {ClientAddingForm} from "./ClientAddingForm";
import {ClientsTable} from "./ClientsTable";


const Clients = () => {
    const {t} = useTranslation();
    return (
        <div>
            <h1>{t('drugs')}</h1>
            <ClientAddingForm/>
            <ClientsTable/>
        </div>
    )
}
export {Clients};