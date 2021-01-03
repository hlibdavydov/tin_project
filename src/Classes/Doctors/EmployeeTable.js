import React, {useContext, useEffect, useState} from "react";
import "../../CSS/EmployeeTable.css"
import {Button} from "react-bootstrap";
import {EmployeeForm} from "./EmployeeForm";
import axios from "axios";
import {Link} from "react-router-dom";
import {SessionContext} from "../../App";

export const EmployeeTable = () => {
    const [showEmployeeAdd, setShowEmployeeAdd] = useState(false);
    const [buttonName, setButtonName] = useState('');
    const [rows, setRows] = useState([]);
    const [user, setUser] = useContext(SessionContext);

    const openEmployeeAdder = () => {
        setShowEmployeeAdd(!showEmployeeAdd);
    }
    useEffect(() => {
        loadEmployees();

    }, [])


    const loadEmployees = () => {
        var config = {
            method: 'get',
            url: 'https://localhost:5001/api/doctors',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then(function (response) {
                setRows(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleAddRow = (employee) => {
        let body = {
            "FirstName": employee.firstName,
            "LastName": employee.lastName,
            "Email": employee.email
        }
        axios.post('https://localhost:5001/api/doctors/add', body, {
            headers:{
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then(response => {
            loadEmployees();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteDoctor = (id) => {

        axios
            .delete(`https://localhost:5001/api/doctors/` + id, {
                headers:{
                    Authorization: `Bearer ${user.accessToken}`

                }
            })
            .then(response => {
                    loadEmployees();
                }
            )
            .catch(reason => {})
    }

    return (
        <div>
            <Button onClick={openEmployeeAdder}>{showEmployeeAdd ? 'hide' : 'show'}</Button>
            <EmployeeForm isActive={showEmployeeAdd} addRow={handleAddRow}/>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                {rows.map((r) => (
                    <tr>
                        <td>{r.firstName}</td>
                        <td>{r.lastName}</td>
                        <td>{r.email}</td>
                        <td id={r.id}>
                            <div className={"employeeButtons"}>
                                <Link className="details" to={'doctors/details/' + r.id}>Details</Link>
                                <Button className="delete"
                                        onClick={() => deleteDoctor(r.id)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )


}