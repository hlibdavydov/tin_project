import React from 'react';
import '../CSS/MainMenu.css';
import {BrowserRouter, Route, Redirect, Switch, Link} from "react-router-dom";
import {MainPage} from "./MainPage";
import {Prescription} from "./Prescriptions/Prescription";
import {Employees} from "./Employees";
import {withTranslation} from "react-i18next";
import {Drugs} from "./Drugs/Drugs";
import {DrugsDetails} from "./Drugs/DrugsDetails";
 class MainMenu extends React.Component {
    state = {
        toggle: false
    }
    Toggle = () => {
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        const {t} = this.props;
        return(
            <BrowserRouter>
                <div className="MainMenu">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">{t('mainPage')}</Link>
                            </li>
                            <li>
                                <Link to="/doctors">{t('doctorsTab')}</Link>
                            </li>
                            <li>
                                <Link to="/prescriptions">{t('prescriptions')}</Link>
                            </li>
                            <li>
                                <Link to ="/drugs">{t('drugs')}</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                    <Switch>
                        <Route path="/" exact component={MainPage}/>
                        <Route path="/prescriptions" component={Prescription}/>
                        <Route path="/doctors" component={Employees}/>
                        <Route path="/drugs" exact component={Drugs}/>
                        <Route path="/drugs/details/:id" component={DrugsDetails}/>
                    </Switch>
            </BrowserRouter>
        )
    }
}
export default withTranslation()(MainMenu);