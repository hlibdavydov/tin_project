import React from "react";
import {EmployeeForm} from "./EmployeeForm";
import {EmployeeTable} from "./EmployeeTable";
export class Employees extends React.Component{

    render() {
        return (
            <div>
                <h1>
                    Employees
                </h1>
                <EmployeeTable/>
            </div>
        );
    }
}
