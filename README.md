# ProcoreProject

This application was built with the `NodeJS`, `ReactJS`, `Bootstrap` frameworks. It also uses a few different libraries, as seen below. This is a simple application that has a landing page that gathers information from the user via a form, and displays it on the "Thank you" page. The form includes form validation for all fields. The data is transferred by a cookie. I used the `react-cookie` npm package to help create the cookie and gather data from it. 

## Getting Started

You can refer to the link here to see the application deployed on Heroku: https://procoreproject-tylerwalker.herokuapp.com/


## Screenshots


* **Landing Page**
[![/client/src/images/LandingPage.PNG](/client/src/images/LandingPage.PNG)](/client/src/images/LandingPage.PNG)

* **Thank You Page**
[![/client/src/images/ThankYou.PNG](/client/src/images/ThankYou.PNG)](/client/src/images/ThankYou.PNG)


## Libraries Used

* [react-router](https://www.npmjs.com/package/react-router) 
* [react-cookie](https://www.npmjs.com/package/universal-cookie) 

## Author

* **Tyler Walker** - *Sole Developer* - [tgwalker93](https://github.com/tgwalker93)



---
# Below is default information on React App

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
yarn install
cd client
yarn install
cd ..
``

After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
yarn build
```

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!
