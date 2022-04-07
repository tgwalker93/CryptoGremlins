
const axios = require('axios');


async function request(url) {
    const response = await axios.get(url);
    return response.data;
}

module.exports = request;


// var XMLHttpRequest = require('xhr2');


// function request(method, url) {
//     return new Promise(function (resolve, reject) {
//         var xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.onload = resolve;
//         xhr.onerror = reject;
//         xhr.send();
//         // resolve('Success');
//     });
// }

// module.exports = request;

