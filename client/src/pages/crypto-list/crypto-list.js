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
            cryptoProjects: null,
            sortButtonText: "Sort by Number of Comments",
            parseComments: true,
            trendings: [],
            searchText: ""
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
                    this.setState({
                        cryptoProjectsReceivedFromDB: true,
                        cryptoProjects: response.data.docs
                    })
                } else {
                    this.setState({ errorResponse: response.data.error })
                }
            }).catch(err => console.log(err));

    }

    getTrendingCoins() {
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

    handleCommentButtonClick = () => {
        window.location.reload(false);
    }

    //CALLS THIS WHEN THE COMPONENT MOUNTS, basically "on page load"
    componentDidMount() {
        this.getCryptoProjectsFromDB();
        this.getTrendingCoins();
    }

    sortCryptoProjects = event => {
        event.preventDefault();

        if(this.state.parseComments) 
        {
            this.setState({
                parseComments: false,
                sortButtonText: "Sort by Market Cap"
            });
            this.state.cryptoProjects.sort(function (a, b) {
                return b.comments.length - a.comments.length;
            });
        }
        else 
        {
            this.setState({
                parseComments: true,
                sortButtonText: "Sort by Number of Comments"
            });
            this.state.cryptoProjects.sort(function (a, b) {
                return parseFloat(b.marketCap) - parseFloat(a.marketCap);
            });
        }
        
        
        
    };

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    search = event => {
        event.preventDefault();

        if(this.state.searchText) 
        {
            var searchObj = {
                searchText: this.state.searchText,
            }
            var docs = this.state.cryptoprojects;
            API.searchCryptoProjects(searchObj)
            .then(response => {
                if (!response.data.error) {
                    if(response.data.docs.length > 0) 
                    {
                        this.setState({
                            cryptoProjectsReceivedFromDB: true,
                            cryptoProjects: response.data.docs
                        })
                    }
                    else {
                        this.setState({
                            cryptoProjectsReceivedFromDB: false
                        })
                    }
                } else {
                    this.setState({ errorResponse: response.data.error })
                }
            }).catch(err => {
                this.setState({
                    cryptoProjectsReceivedFromDB: false
                })
            });
        }
        
    };

    testStuff() {
        if(this.state.searchText) 
        {
            var searchObj = {
                searchText: this.state.searchText,
            }
            var docs = this.state.cryptoprojects;
            API.searchCryptoProjects(searchObj)
            .then(response => {
                if (!response.data.error) {
                    if(response.data.docs.length > 0) 
                    {
                        this.setState({
                            cryptoProjectsReceivedFromDB: true,
                            cryptoProjects: response.data.docs
                        })
                    }
                    else {
                        this.setState({
                            cryptoProjectsReceivedFromDB: false
                        })
                    }
                } else {
                    this.setState({ errorResponse: response.data.error })
                }
            }).catch(err => {
                this.setState({
                    cryptoProjectsReceivedFromDB: false
                })
            });
        }
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
                        {this.state.trendings.length > 0 ? 
                                <div><h3>These are the super hot trending coins</h3>
                                {this.state.trendings.map(item => (
                                    <h2>
                                        Coin name: {item.coinTicker} | Number of recent comments: {item.numComments}
                                    </h2>
                                ))}</div> : ""}
                        <Input value={this.state.searchText} id="searchText" onChange={this.handleChange.bind(this)} name="searchText"></Input>
                        <FormBtn onClick={this.search.bind(this)} id="searchButton">Search</FormBtn>
                        <FormBtn onClick={this.getCryptoProjectsFromDB.bind(this)} id="searchButton">Show All Crypto Projects</FormBtn> <br />
                        <FormBtn onClick={this.sortCryptoProjects.bind(this)} id="sortCommentsButton">{this.state.sortButtonText}</FormBtn> 
                        {this.state.cryptoProjectsReceivedFromDB ?

                            <div>

                                {this.state.cryptoProjects ? <div>
                                <table id="cry" className="table table-hover cryptolistingsView_table">
                                    <thead id="cryptoListingsViewTable_head" className="thead-dark">
                                        <tr>
                                            <th className="cryptoListingsViewTable_th" scope="col">Name</th>
                                            <th className="cryptoListingsViewTable_th" scope="col">Ticker</th>
                                            <th className="cryptoListingsViewTable_th" scope="col">Price</th>
                                            <th className="cryptoListingsViewTable_th" scope="col">Market Cap</th>
                                            <th className="cryptoListingsViewTable_th" scope="col">Volume 24h</th>
                                            <th className="cryptoListingsViewTable_th" scope="col">Circulating Supply</th>
                                            <th className="cryptoListingsViewTable_th" scope="col"># Of Comments</th>
                                            <th className="cryptoListingsViewTable_th" scope="col">Average Rating (Out of 5)</th>
                                            <th className="cryptoListingsViewTable_th" scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {this.state.cryptoProjects.map(listing => {
                                            return (
                                                <tr className="cryptoListingsViewTable_tr" key={listing._id}>
                                                    <td id="nameColumn" className="cryptoListingsViewTable_td">{listing.name}</td>
                                                    <td id="tickerColumn" className="cryptoListingsViewTable_td">{listing.ticker}</td>
                                                    <td id="priceColumn" className="cryptoListingsViewTable_td">{"$" + Number(parseFloat(listing.price).toFixed(2)).toLocaleString('en')}</td>
                                                    <td id="marketCapColumn" className="cryptoListingsViewTable_td">{Number(parseFloat(listing.marketCap).toFixed(2)).toLocaleString('en')}</td>
                                                    <td id="volume24hColumn" className="cryptoListingsViewTable_td">{Number(parseFloat(listing.volume24h).toFixed(2)).toLocaleString('en')}</td>
                                                    <td id="circulatingSupplyColumn" className="cryptoListingsViewTable_td">{Number(parseFloat(listing.circulatingSupply).toFixed(2)).toLocaleString('en')}</td>
                                                    <td id="numOfCommentsColumn" className="cryptoListingsViewTable_td">{Number(parseFloat(listing.comments.length).toFixed(2)).toLocaleString('en')}</td>
                                                    <td id="avgRatingColumn" className="cryptoListingsViewTable_td">{listing.averageRating = listing.averageRating ? parseFloat(listing.averageRating).toFixed(2) : 0}</td>
                                                    <td id="viewComments" className="cryptoListingsViewTable_td"><Link to={"/profile/" + listing._id} className="cryptoProfileButton"><FormBtn id="cryptoProfileButton">Comments</FormBtn> </Link></td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>
                                </table>
                                </div> : <h3 className="noResultsMessage"> No Results to Display </h3>}         


                            </div>






                            :


                            <h3 className="noResultsMessage">No Results to Display </h3>}

                        <br />
                        <br />








                    </Col>
                </Row>

            </Container>
        );
    }
}

export default CryptoListPage;