import React, {useContext, useState} from 'react';
import '../CSS/MainMenu.css';
import {BrowserRouter, Route, Redirect, Switch, Link} from "react-router-dom";
import {MainPage} from "./MainPage";
import {Prescription} from "./Prescriptions/Prescription";
import {Employees} from "./Doctors/Employees";
import {useTranslation, withTranslation} from "react-i18next";
import {Drugs} from "./Drugs/Drugs";
import {DrugsDetails} from "./Drugs/DrugsDetails";
import {DoctorDetails} from "./Doctors/DoctorDetails";
import {Clients} from './Clients/Clients'
import {ClientDetails} from './Clients/ClientDetails'
import {SessionContext} from "../App";

const MainMenu = () => {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useContext(SessionContext);
    const {t} = useTranslation();

    return (
        <BrowserRouter>
            <div className="MainMenu">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">{t('mainPage')}</Link>
                        </li>

                        {(user.roles && (user.roles.includes('admin' || user.role.includes('doctor')))) &&
                        <>
                            <li>
                                <Link to="/prescriptions">{t('prescriptions')}</Link>
                            </li>
                            <li>
                                <Link to='/doctors'>{t('doctors')}</Link>
                            </li>
                            <li>
                                <Link to="/clients">{t('clients')}</Link>
                            </li>
                        </>
                        }
                        <li>
                            <Link to="/drugs">{t('drugs')}</Link>
                        </li>

                    </ul>
                </nav>
            </div>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/prescriptions" component={Prescription}/>
                <Route path="/doctors" exact component={Employees}/>
                <Route path="/drugs" exact component={Drugs}/>
                <Route path="/clients" exact component={Clients}/>
                <Route path="/drugs/details/:id" component={DrugsDetails}/>
                <Route path="/doctors/details/:id" component={DoctorDetails}/>
                <Route path="/clients/details/:id" component={ClientDetails}/>
            </Switch>
        </BrowserRouter>
    );

}
export default MainMenu;