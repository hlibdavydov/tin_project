import React from "react";
import "../CSS/EmployeeForm.css"
import {Button} from "react-bootstrap";
import {EmailField, TextField} from "./DataValidation/Field";

export class EmployeeForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            firstNameError: '',
            lastNameError: '',
            emailError:'',

        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    submitInput = event => {
        event.preventDefault();
        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }
        this.props.addRow(employee);
    }

    render() {
        if (this.props.isActive) {
            return (
                <div>
                    <form onSubmit={this.submitInput}>
                        <label>First name<abbr title="Required" aria-label="required">*</abbr></label>
                        <input name='firstName' type="text" value={this.state.firstName}
                               onChange={this.handleFirstName} required={true}/>
                        <span className='error-text'>{this.state.firstNameError}</span>
                        <label>Last name<abbr title="Required" aria-label="required">*</abbr></label>
                        <input id="lastName" name="lastName" type="text" value={this.state.lastName}
                               onChange={this.handleLastName} required={true}/>
                        <span className='error-text'>{this.state.lastNameError}</span>
                        <label>Email<abbr title="Required" aria-label="required">*</abbr></label>
                        <input id="email" name="email" type="email" value={this.state.email}
                               onChange={this.handleEmail} required={true}/>
                        <span className='error-text'>{this.state.emailError}</span>
                        <Button className="submit" type="submit">Add New Employee</Button>;
                    </form>
                </div>
            );
        } else {
            return (
                <div/>
            )
        }
    }
    handleFirstName = event => {
        let value = event.target.value;
        const firstNameField = new TextField(value);
        this.setState({firstNameError: ""})
        try {
            firstNameField.checkRequirements();
        } catch (e) {
            this.setState({firstNameError: e})
        }
        this.setState({firstName: value})
    }
    handleLastName = event => {
        let value = event.target.value;
        const lastNameField = new TextField(value);
        this.setState({lastNameError: ""})
        try {
            lastNameField.checkRequirements();
        } catch (e) {
            this.setState({lastNameError: e})
        }
        this.setState({lastName: value})
    }
    handleEmail = event => {
        let value = event.target.value;
        const emailField = new EmailField(value, 5,60);
        this.setState({emailError: ""})
        try {
            emailField.checkRequirements();
        } catch (e) {
            this.setState({emailError: e})
        }
        this.setState({email: value})
    }
}

