import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import "./thank-you.css";
import Cookies from 'universal-cookie';


class ThankYou extends Component {
    constructor(props) {
        super(props)
        this.state = {
        firstName: "",
        lastName: "",
        emailAddress:"",
        phoneNumber:""
    };
    }

    //When the page loads, we want to get the data from the cookie.
    componentDidMount() {
        this.getCookie();
    }
  
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getCookie() {
        const cookies = new Cookies();
        //Here we check if the cookie "demo-requested" exists. If not, then we send user back to landing page.
        if (!cookies.get("demo-requested")){
            this.props.history.push("/landing-page");
        } else{
        var userData = cookies.get("demo-requested");
        this.setState({firstName:userData.firstName});
        this.setState({lastName: userData.lastName});
        this.setState({emailAddress: userData.emailAddress});
        this.setState({phoneNumber: userData.phoneNumber});
        }
        
    }

    render() {
        return (
            <Container fluid="true">

                <Row>
                    <Col size="md-12">
                        <div className="thankYouText">
                        <h1 id="thankYouHeader"><strong>Thank you {(this.state.firstName!==null || this.state.firstName!=="") ? this.state.firstName: this.state.lastName}!</strong></h1>
                        </div>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default ThankYou;
