import React from 'react';
import '../CSS/MainMenu.css';
import {BrowserRouter, Route, Redirect, Switch, Link} from "react-router-dom";
import {MainPage} from "./MainPage";
import {Prescription} from "./Prescriptions/Prescription";
import {Employees} from "./Employees";

export class MainMenu extends React.Component {
    state = {
        toggle: false
    }
    Toggle = () => {
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        return(
            <BrowserRouter>
                <div className="MainMenu">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Main Page</Link>
                            </li>
                            <li>
                                <Link to="/recipes">Recipes</Link>
                            </li>
                            <li>
                                <Link to="/employees">Employees</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/" exact component={MainPage}/>
                        <Route path="/recipes" component={Prescription}/>
                        <Route path="/employees" component={Employees}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}