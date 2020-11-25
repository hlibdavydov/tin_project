import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './Classes/Header.js'
import {MainMenu} from "./Classes/MainMenu.js";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import {App} from "./App";
const routes = (
<App/>
);
ReactDOM.render(routes, document.getElementById('root'));

