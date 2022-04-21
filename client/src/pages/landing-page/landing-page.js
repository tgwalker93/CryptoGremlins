import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import API from "../../utils/API";
import "./landing-page.css";
class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navigateToThankYou: false,
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            formErrors: { firstName: "", lastName: "", emailAddress: "", phoneNumber: "" },
            firstNameValid: false,
            lastNameValid: false,
            emailAddressValid: false,
            phoneNumberValid: false,
            isLoaded: false,
            trendings: []
        };
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }


    componentDidMount() {
        API.getTrending()
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        trendings: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    validateFields() {
        let fieldValidationErrors = this.state.formErrors;
        let emailAddressValid = this.state.emailAddressValid;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let phoneNumberValid = this.state.phoneNumberValid;

        //Validating email using Regex
        let matchArray = this.state.emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (matchArray !== null) {
            emailAddressValid = true;
        }
        fieldValidationErrors.emailAddress = emailAddressValid ? "" : "Please provide a valid email";

        //Validating First Name by checking if there is anything there.
        firstNameValid = this.state.firstName.length > 0;
        fieldValidationErrors.firstName = firstNameValid ? "" : "Please provide your first name";

        //Validating Last Name by checking if there is anything there.
        lastNameValid = this.state.lastName.length > 0;
        fieldValidationErrors.lastName = lastNameValid ? "" : "Please provide your last name";

        //Validating phone number by checking if there are 16 digits. (counting the special characters besides the digits.)
        phoneNumberValid = this.state.phoneNumber.length === 16;
        fieldValidationErrors.phoneNumber = phoneNumberValid ? "" : "Please provide a phone number";

        this.setState({
            formErrors: fieldValidationErrors,
            emailAddressValid: emailAddressValid,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            phoneNumberValid: phoneNumberValid
        }, () => {
            this.setCookieAndChangePage();
        });
    }

    //Here we check if the field has an error. If it does, it will add the "has-error" class to the field.
    //"has-error" is a default bootstrap class that will nicely color the outline of the field red to indicate an error for the user. 
    errorClass(error) {
        if (error == "") {
            return "";
        }
        return (error.length === 0 ? "" : "has-error");
    }

    //This is used onBlur in order to trim the values. 
    formatInput = (event) => {
        const attribute = event.target.getAttribute('name')
        this.setState({ [attribute]: event.target.value.trim() })
    }

    formatPhone(obj) {
        if (obj == null) {
            return;
        }
        var numbers = obj.state.phoneNumber.replace(/\D/g, "").substring(0, 10),
            char = { 0: "(", 3: ") ", 6: " - " };
        obj.state.phoneNumber = "";
        for (var i = 0; i < numbers.length; i++) {
            obj.state.phoneNumber += (char[i] || "") + numbers[i];
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.validateFields();
    };

    setCookieAndChangePage() {
        //This function will be called once all fields are validated. If any are not valid, the binary "valid" variable will be false.
        if (this.state.firstNameValid && this.state.lastNameValid && this.state.emailAddressValid && this.state.phoneNumberValid) {

            const cookies = new Cookies();

            var userObj = {
                "firstName": this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1),
                "lastName": this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1),
                "emailAddress": this.state.emailAddress,
                "phoneNumber": this.state.phoneNumber
            }
            cookies.set("demo-requested", userObj, { path: "/" });

            //Save Comment in DB
            API.saveComment(userObj)
                .then(res => console.log(res))
                .catch(err => console.log(err));

            this.setState({ navigateToThankYou: true });
        }




    }

    render() {
        return (
            
            <Container id="container" fluid="true">
                <h1>These are the super hot trending coins!</h1>
                    {this.state.trendings.map(item => (
                        <h2>
                            Coin name: {item.coinTicker} | Number of recent comments: {item.numComments}
                        </h2>
                    ))}
                {this.state.navigateToThankYou && (
                    <Navigate to="/thank-you" replace={true} />
                )}
                <Row id="mainRow">
                    <Col id="formCol" size="sm-6">
                        <h1 id="formHeader">Simple Form</h1>
                        <form>
                            <p>First Name</p>
                            <Input onBlur={this.formatInput.bind(this)} isvalid={this.state.firstNameValid.toString()} fielderror={this.state.formErrors.firstName} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.firstName)}`} value={this.state.firstName} id="firstName" onChange={this.handleChange.bind(this)} name="firstName"></Input>


                            <p>Last Name</p>
                            <Input onBlur={this.formatInput.bind(this)} isvalid={this.state.lastNameValid.toString()} fielderror={this.state.formErrors.lastName} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.lastName)}`} value={this.state.lastName} id="lastName" onChange={this.handleChange.bind(this)} name="lastName"></Input>

                            <p>Email Address</p>
                            <Input onBlur={this.formatInput.bind(this)} isvalid={this.state.emailAddressValid.toString()} fielderror={this.state.formErrors.emailAddress} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.emailAddress)}`} value={this.state.emailAddress} id="emailAddress" onChange={this.handleChange.bind(this)} name="emailAddress"></Input>


                            <p>Phone Number</p>
                            <Input onBlur={this.formatPhone(this)} isvalid={this.state.phoneNumberValid.toString()} fielderror={this.state.formErrors.phoneNumber} formgroupclass={`form-group ${this.errorClass(this.state.formErrors.phoneNumber)}`} value={this.state.phoneNumber} id="phoneNumber" onChange={this.handleChange.bind(this)} name="phoneNumber"></Input>

                            <FormBtn onClick={this.handleFormSubmit.bind(this)} type="submit"> Submit </FormBtn>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LandingPage;
