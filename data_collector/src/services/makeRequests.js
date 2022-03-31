
function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}

export function requestListing() {
    var apikey = {
        key: '461f750d-2657-4821-89f9-4b0659d0f35a'
    }
    request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key)
    .then((req) => {
      var x = JSON.parse(req.target.responseText);
      console.log(x.data);
      // console.log(req.target.responseText);
    })
    .catch(err => {
      console.log(err);
    });
}
