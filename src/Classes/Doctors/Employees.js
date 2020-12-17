import React from "react";
import {EmployeeForm} from "./EmployeeForm";
import {EmployeeTable} from "./EmployeeTable";
import {useTranslation} from "react-i18next";
export const Employees = () =>{
    const {t} = useTranslation();
        return (
            <div>
                <h1>
                    {t('doctorsTab')}
                </h1>
                <EmployeeTable/>
            </div>
        );
}
