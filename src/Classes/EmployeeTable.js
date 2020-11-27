import React from "react";
import "../CSS/EmployeeTable.css"
import {Button} from "react-bootstrap";
import {EmployeeForm} from "./EmployeeForm";

export class EmployeeTable extends React.Component {

    state = {
        showEmployeeAdd: false,
        buttonName: '',
        rows: [['Jan', 'Kowalski', 'j.kowalski@gmail.com']]
    }
    openEmployeeAdder = () => {
        this.setState({showEmployeeAdd: !this.state.showEmployeeAdd})
    }

    constructor(props) {
        super(props);
    }

    handleAddRow = (employee) => {
        const rows = this.state.rows
        rows.unshift([employee.firstName, employee.lastName, employee.email])
        this.setState({rows: rows})
    }

    render() {
        if (this.state.showEmployeeAdd) {
            this.state.buttonName = 'Hide \'Add new employee\' form'
        } else {
            this.state.buttonName = 'Add New Employee'
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
                    </tr>
                    {this.state.rows.map((r) => (
                        <tr>
                            <td>{r[0]}</td>
                            <td>{r[1]}</td>
                            <td>{r[2]}</td>
                            <td>
                                <div className={"employeeButtons"}>
                                    <Button className="details">Details</Button>
                                    <Button className="edit">Edit</Button>
                                    <Button className="delete">Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>

        );
    }

}