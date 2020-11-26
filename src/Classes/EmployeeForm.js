import React from "react";
import "../CSS/EmployeeForm.css"
import {Button} from "react-bootstrap";

export class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    submitInput(event) {
        event.preventDefault();

    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitInput}>
                    <label>First name<abbr title="Required" aria-label="required">*</abbr></label>
                    <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange}/>
                    <label>Last name<abbr title="Required" aria-label="required">*</abbr></label>
                    <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange}/>
                    <label>Email<abbr title="Required" aria-label="required">*</abbr></label>
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                    <Button className="submit" type="submit">Submit</Button>;
                </form>
            </div>
        )
    }
}
