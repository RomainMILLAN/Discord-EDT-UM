const request = (url, params = {}, method = 'GET') => {
    let options = {
        method
    };
    if ('GET' === method) {
        url += '?' + (new URLSearchParams(params)).toString();
    }
    else {
        options.body = JSON.stringify(params);
    }
    return fetch(url, options).then(response => response.json());
};
const get = (url, params) => request(url, params, 'GET');
const post = (url, params) => request(url, params, 'POST');
