import React from "react";
import "../CSS/Footer.css"
import {Button} from "react-bootstrap";

export class Footer extends React.Component {
    state = {
        isShow: true
    }
    closeFooter = () => {
        this.setState({isShow: false});
    }

    render() {
        if (this.state.isShow) {
            return (
                <div>
                    <footer>
                        <h1>Hlib Davydov, s19208</h1>
                        <Button onClick={this.closeFooter}>Close footer</Button>
                    </footer>
                </div>
            );
        } else {
            return (
                <div/>
            )
        }
    }
}
