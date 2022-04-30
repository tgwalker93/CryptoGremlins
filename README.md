# Crypto Gremlins

Crypto Gremlins is a Crypto Review website where users can leave reviews on specific crypto projects which are pulled from CoinMarketCap. This application was built with the`MongoDB`, `Express`,`React`, `Node`, and `Bootstrap` frameworks. For more documentation on this application, [please check out our wiki!](https://github.com/tgwalker93/CryptoGremlins/wiki)

## Getting Started

You can refer to the link here to see the application deployed on Heroku: https://crypto-gremlins.herokuapp.com/


## Author

* **Tyler Walker** - *Developer* - [tgwalker93](https://github.com/tgwalker93)
* **Adam Haze** - *Developer* - [adamhaze](https://github.com/adamhaze)
* **Alex Orlowski** - *Developer* - [aorlowski-cu](https://github.com/aorlowski-cu)


---
## Getting Started

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
npm install
cd client
npm install
cd ..
```

After both installations complete, run the following command in your terminal:

```
npm start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
npm run build
```

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!
