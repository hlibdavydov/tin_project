import React from 'react';
import '../CSS/Header.css';
import Button from "react-bootstrap/Button";
import {withTranslation} from "react-i18next";
import "../Translations/translate";
import Settings from "./Settings";

class Header extends React.Component {
    state = {
        isActive: false,
    }

    render() {
        const {t} = this.props;
        if (this.state.isActive) {
            return (
                <div>
                    <header>
                        <h1>
                            {t("nameOfCompany")}
                            <h2>
                                {t("descriptionOfName")}
                            </h2>
                        </h1>
                        <img id="logo" src="http://www.freepnglogos.com/uploads/medicine-logo-png-1.png"
                             alt="LOGO"/>
                    </header>
                    <Button variant={"primary"} size={"lg"} block={true} onClick={this.hideHeader}>Hide</Button>
                </div>
            );
        } else {
            return <Button variant={"primary"} size={"lg"} block={true} onClick={this.showHeader}>Show Header</Button>
        }
    }

    constructor(props) {
        super(props);
    }

    hideHeader = () => {
        this.setState({isActive: false})
    }
    showHeader = () => {
        this.setState({isActive: true})
    }

}

export default withTranslation()(Header);

