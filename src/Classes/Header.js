import React from 'react';
import '../CSS/Header.css';
import Button from "react-bootstrap/Button";

export class Header extends React.Component {
    state = {
        isActive: true
    }

    render() {
        if (this.state.isActive) {
            return (
                <div>
                    <header>
                        <h1>
                            {this.state.companyName}
                        </h1>
                        <img id="logo" src="https://logos-download.com/wp-content/uploads/2018/02/Hoover_logo_r.png"
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
        this.state = {
            companyName: "ACHME HR Department",
        }
    }

    hideHeader = () => {
        this.setState({isActive: false})
    }
    showHeader = () => {
        this.setState({isActive: true})
    }

}

