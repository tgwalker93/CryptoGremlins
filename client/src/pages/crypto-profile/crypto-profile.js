import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./crypto-profile.css";
import {CommentContainer, CommentPanel } from "../../components/CommentContainer";
import { Link, useParams, useLocation  } from "react-router-dom";
import Rating from 'react-rating'
import starIcon from '../../images/star-full.png';
import noStarIcon from '../../images/star-empty.png';

//const { id } = useParams();

class CryptoProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formErrors: { name: "" },
            location: null,
            id: null,
            currentComment: "",
            currentUserName: "Anonymous",
            currentRating: 0
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
                    var listing = response.data.doc;
                    listing.comments.sort(function(a,b){
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(b.timestamp.replace(" at ", " ")) - new Date(a.timestamp.replace(" at ", " "));
                      });
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
                ticker: this.state.ticker,
                rating: this.state.currentRating
            }
            API.saveComment(commentObj)
                .then(res => {
                    this.getSpecificCryptoProjectAndComments()
                })
                .catch(err => console.log(err));
        }
    }

    handleStarRatingChange = (rating) => {
        this.setState({ 
            currentRating: rating
        })

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
                        <h3>Price: {"$" + Number(parseFloat(this.state.price).toFixed(2)).toLocaleString('en')}</h3>
                        <h3>Market Cap: {Number(parseFloat(this.state.marketCap).toFixed(2)).toLocaleString('en')}</h3>
                        <h3>Ticker: {this.state.ticker}</h3>
                        <h3>timestamp: {this.state.timeStamp}</h3>
                        <h3>volume24h: {Number(parseFloat(this.state.volume24h).toFixed(2)).toLocaleString('en')}</h3>
                    <Rating
                        initialRating={this.state.currentRating}
                        emptySymbol={<img src={noStarIcon} className="icon" />}
                        fullSymbol={<img src={starIcon} className="icon" />}
                        onChange={this.handleStarRatingChange}
                        />

                    <br />
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
                                            <Rating initialRating={comment.rating} 
                                                    emptySymbol={<img src={noStarIcon} className="icon" />}
                                                    fullSymbol={<img src={starIcon} className="icon" />}
                                                    readonly />
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