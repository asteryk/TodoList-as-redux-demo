function params(url, data) {
    if (!data) {
        return url;
    }
    var list = [];
    for (var key in data) {
        list.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    return url + (url.indexOf('?') === -1 ? '?' : '') + list.join('&');
}


function ajax(url, options) {

    var init = {
        method: options.method,
        headers: headers,
        credentials: 'include'
    };

    var headers = {};
    if (options.contentType === 'application/json') {
        headers['Content-Type'] = 'application/json';
        if (options.body) {
            init.body = JSON.stringify(options.body);
        }
    } else {
        if (options.body) {
            var formData = new FormData();
            for (var key in options.body) {
                formData.append(key, options.body[key]);
            }
            init.body = formData;
        }
    }
    // 处理参数
    url = params(url, options.data);


    var promise = new Promise(function(resolve, reject) {
        fetch(url, init).then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                    resolve(data);
                }, function(e) {
                    reject(e);
                });
            } else {
                reject(res.status);
            }

        }, function(e) {
            // error
            reject(e);
        });
    })
    return promise;
}

export function get(url, options) {
    return ajax(url, Object.assign({}, options, { method: 'GET' }));
}

export function post(url, options) {
    return ajax(url, Object.assign({}, options, { method: 'POST' }));
}


export function postByJson(url, options) {
    return ajax(url, Object.assign({}, options, { method: 'POST', contentType: 'application/json' }));
}


export default {
    get: get,
    post: post,
    postByJson: postByJson
}