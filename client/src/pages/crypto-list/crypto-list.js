import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./crypto-list.css";
import { Link } from "react-router-dom";

class CryptoListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formErrors: { name: "" },
            cryptoProjectsReceivedFromDB: false,
            cyrptoProjects: null
        };

    }

    delta = () => {
        this.setState({
            count: this.state.count + 1
        });
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    //This method will handle all the form validation
    validateFields() {   


    }

    //Here we check if the field has an error. If it does, it will add the "has-error" class to the field.
    //"has-error" is a default bootstrap class that will nicely color the outline of the field red to indicate an error for the user. 
    errorClass(error) {
        return (error.length === 0 ? "" : "has-error");
    }

    //This is used onBlur in order to trim the values. 
    formatInput = (event) => {
        const attribute = event.target.getAttribute('name')
        this.setState({ [attribute]: event.target.value.trim() })
    }


    handleFormSubmit = event => {
        event.preventDefault();
        this.validateFields();
    };




    getCryptoProjectsFromDB() {
        API.getAllCryptoProjects()
            .then(response => {
                if (!response.data.error) {
                    console.log(response.data);
                    this.setState({ cryptoProjectsReceivedFromDB: true,
                        cyrptoProjects: response.data.docs
                    })
                } else {
                    this.setState({ errorResponse: response.data.error })
                }
            }).catch(err => console.log(err));

    }





    //CALLS THIS WHEN THE COMPONENT MOUNTS, basically "on page load"
    componentDidMount() {
        this.getCryptoProjectsFromDB();
     } 

    render() {
        return (
             <Container id="containerViewCryptoProjects" fluid="true">
                <Row id="mainRow">
                    <Col size="sm-12">
                        <div className="jumbotron jumbotron-fluid">
                            <Container id="container" fluid="true">
                                <h2 className="display-4">View Crypto Projects</h2>
                            </Container>
                        </div>
                        <br />
                        <br />                

                            {this.state.cryptoProjectsReceivedFromDB ? 
                            
                            <div>
                                <hr />
                                <h1 className="cryptoProjectsTitle">CryptoProjects</h1>
                                {this.state.cyrptoProjects.length ? (
                                    <div>
                                    <table id="cry" className="table table-hover cryptolistingsView_table">
                                        <thead id="cryptoListingsViewTable_head" className="thead-dark">
                                            <tr>
                                                <th className="cryptoListingsViewTable_th" scope="col">Name</th>
                                                <th className="cryptoListingsViewTable_th" scope="col">Ticker</th>
                                                <th className="cryptoListingsViewTable_th" scope="col">Price</th>
                                                <th className="cryptoListingsViewTable_th" scope="col">Market Cap</th>
                                                <th className="cryptoListingsViewTable_th" scope="col">Volume 24h</th>
                                                <th className="cryptoListingsViewTable_th" scope="col">Circulating Supply</th>
                                                <th className="cryptoListingsViewTable_th" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.cyrptoProjects.map(listing => {
                                                return (
                                                        
                                                        <tr className="cryptoListingsViewTable_tr" key={listing._id}>
                                                            <td id="nameColumn" className="cryptoListingsViewTable_td">{listing.name}</td>
                                                            <td id="tickerColumn" className="cryptoListingsViewTable_td">{listing.ticker}</td>
                                                            <td id="priceColumn" className="cryptoListingsViewTable_td">{listing.price}</td>
                                                            <td id="marketCapColumn" className="cryptoListingsViewTable_td">{listing.marketCap}</td>
                                                            <td id="volume24hColumn" className="cryptoListingsViewTable_td">{listing.volume24h}</td>
                                                            <td id="circulatingSupplyColumn" className="cryptoListingsViewTable_td">{listing.circulatingSupply}</td>
                                                            <td id="viewComments" className="cryptoListingsViewTable_td"><FormBtn>View Comments</FormBtn></td>
                                                        </tr>
                                         
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    </div>

                                ) : (<h3 className="noResultsMessage"> No Results to Display </h3>)} 


                            </div>
                            
                            
                            
                            
                            
                            
                            :
                                                      
                            
                            ""}

                                <br />
                                    <br />
                                
                       
                       
                


                              

                    </Col>
                </Row>

            </Container>
        );
    }
}

export default CryptoListPage;