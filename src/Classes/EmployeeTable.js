import React from "react";
import "../CSS/EmployeeTable.css"
import {Button} from "react-bootstrap";
import {EmployeeForm} from "./EmployeeForm";
import axios from "axios";

export class EmployeeTable extends React.Component {

    state = {
        showEmployeeAdd: false,
        buttonName: '',
        rows: []
    }
    openEmployeeAdder = () => {
        this.setState({showEmployeeAdd: !this.state.showEmployeeAdd})
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees = () => {
        axios.get('https://localhost:5001/api/doctors')
            .then(response => {
                this.setState({rows: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleAddRow = (employee) => {
        let headers = {
            "FirstName": employee.firstName,
            "LastName": employee.lastName,
            "Email": employee.email
        }
        axios.post('https://localhost:5001/api/doctors/add', headers).then(response => {
            this.loadEmployees();
        }).catch(error => {
            console.log(error);
        });
    }

    deleteDoctor = (firstName, lastName) => {

        axios
            .delete(`https://localhost:5001/api/doctors?firstName=${firstName}&lastName=${lastName}`)
            .then(response => {
                    this.loadEmployees();
                }
            )
    }

    render() {
        if (this.state.showEmployeeAdd) {
            this.state.buttonName = 'Hide \'Add New Doctor\' form'
        } else {
            this.state.buttonName = 'Add New Doctor'
        }
        return (
            <div>
                <Button onClick={this.openEmployeeAdder}>{this.state.buttonName}</Button>
                <EmployeeForm isActive={this.state.showEmployeeAdd} addRow={this.handleAddRow}/>
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    {this.state.rows.map((r) => (
                        <tr>
                            <td>{r.firstName}</td>
                            <td>{r.lastName}</td>
                            <td>{r.email}</td>
                            <td>
                                <div className={"employeeButtons"}>
                                    <Button className="details">Details</Button>
                                    <Button className="edit">Edit</Button>
                                    <Button className="delete"
                                            onClick={() => this.deleteDoctor(r.firstName, r.lastName)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>

        );
    }

}