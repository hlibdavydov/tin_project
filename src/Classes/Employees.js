import React from "react";
import {EmployeeForm} from "./EmployeeForm";
export class Employees extends React.Component{

    render() {
        return (
            <div>
                <h1>
                    Employees
                </h1>
                <EmployeeForm/>
            </div>
        );
    }
}
