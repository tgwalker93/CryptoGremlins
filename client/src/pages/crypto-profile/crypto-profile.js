import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./crypto-profile.css";
import {CommentContainer, CommentPanel } from "../../components/CommentContainer";
import { Link, useParams, useLocation  } from "react-router-dom";

//const { id } = useParams();

class CryptoProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formErrors: { name: "" },
            location: null,
            id: null,
            currentComment: "",
            currentUserName: "Anonymous"
        };

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




    getSpecificCryptoProjectAndComments() {
        API.getSpecificCryptoProjectAndComments(this.props.params.id)
            .then(response => {
                if (!response.data.error) {
                    console.log(response.data);
                    var listing = response.data.doc;
                    this.setState({ 
                        id: listing._id,
                        name: listing.name,
                        marketCap: listing.marketCap,
                        price: listing.price,
                        ticker: listing.ticker,
                        timeStamp: listing.timeStamp,
                        volume24h: listing.volume24h,
                        comments: listing.comments
                    })
                } else {
                    this.setState({ errorResponse: response.data.error })
                }
            }).catch(err => console.log(err));

    }

    //CALLS THIS WHEN THE COMPONENT MOUNTS, basically "on page load"
    componentDidMount() {
        this.getSpecificCryptoProjectAndComments();

     } 

     addComment() {
         
        if (this.state.currentComment) {
            var commentObj = {
                text: this.state.currentComment,
                userWhoMadeComment: this.state.currentUserName,
                cryptoProjectID: this.state.id,
                ticker: this.state.ticker
            }
            API.saveComment(commentObj)
                .then(res => this.getSpecificCryptoProjectAndComments())
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
             <Container id="containerViewCryptoProjects" fluid="true">
                <Row id="mainRow">
                    {this.state.id ? (<Col size="sm-12">

                        <div className="jumbotron jumbotron-fluid">
                            <Container id="container" fluid="true">.
                            <h2 className="display-4">{this.state.name}</h2>
                            </Container>
                        </div>   
                        <Link to={"/crypto-list"} className="backToListingsButton"><FormBtn id="backToListingsButton">Back to Crypto Listings Page?</FormBtn> </Link>
                        <h3>Price: {this.state.price}</h3>
                        <h3>Market Cap: {this.state.marketCap}</h3>
                        <h3>Ticker: {this.state.ticker}</h3>
                        <h3>timestamp: {this.state.timeStamp}</h3>
                        <h3>volume24h: {this.state.volume24h}</h3>
                        
                    <textarea 
                        placeholder='Comment'
                        id="currentComment"
                        cols="80" rows="10"
                        onBlur={this.formatInput.bind(this)}
                        value={this.state.currentComment}
                        onChange={this.handleChange.bind(this)}
                        name="currentComment"
                    ></textarea>
                    <Input placeholder='Username (default: anonymous)'
                        id="currentUserName"
                        onBlur={this.formatInput.bind(this)}
                        value={this.state.currentUserName}
                        onChange={this.handleChange.bind(this)}
                        name="currentUserName"
                    />

                    <FormBtn className='btn btn-success save' onClick={() => this.addComment()}>Save Comment</FormBtn>

                    {this.state.comments.length ? (
                        <CommentContainer>
                            <div className="CommentContainer">
                                {this.state.comments.map(comment => {
                                    return (
                                        <div key={comment._id}>
                                        
                                            <CommentPanel key={comment._id} text={comment.userWhoMadeComment + ": " + comment.text} date={comment.timestamp}>

                                        </CommentPanel>
                                        </div>
                                    );
                                })}
                            </div>
                        </CommentContainer>
                    ) : (
                            <h3> There are no comments! </h3>
                        )}

                    </Col>) : (<div><Link to={"/crypto-list"} className="backToListingsButton"><FormBtn id="backToListingsButton">Back to Crypto Listings Page?</FormBtn> </Link><h3 className="noResultsMessage"> No Results to Display </h3></div>)}

                </Row>

            </Container>
        );
    }
}

export default CryptoProfilePage;