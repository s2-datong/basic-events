const _request = (url, data, method, headers) => {

    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest();
        ajax.open(method.toUpperCase(), url);
        if(headers){
            let _hkeys = Object.keys(headers);
            if(_hkeys.length > 0){
                _hkeys.forEach(header_key => {
                    if(headers.hasOwnProperty(header_key)){
                        const header_value = headers[header_key];
                        ajax.setRequestHeader(header_key, header_value);
                    }
                })
            }
        }
        ajax.onload = () => {
            try{
                if(ajax.status > 299) throw new Error('')
                const result = JSON.parse(ajax.responseText);
                resolve(result);
            }
            catch(e){
                reject(e);
            }
        };
        ajax.onerror = () => {
            reject(new Error("Request Failed"));
        }
        ajax.ontimeout = () => {
            reject(new Error("Request Timedout"));
        }

        if(method.toUpperCase() === 'GET'){
            ajax.send();
        }
        else{
            if(data) ajax.send(JSON.stringify(data));
            else ajax.send();
        }
    });
}

const _get = (url, headers) => {
    return _request(url, null, 'GET', headers);
};
const _post = (url, data, headers) => {
    return _request(url, data, 'POST', headers);
};
const _patch = (url, data, headers) => {
    return _request(url, data, 'PATCH', headers);
};
const _delete = (url, data, headers) => {
    return _request(url, data, 'DELETE', headers);
};