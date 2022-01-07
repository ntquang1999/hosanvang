export class Http {
    static post(url: string, params: { [key: string]: string }, onFinished: (err: any, json: any) => void, headers: { [key: string]: string } = null) {
        var xhr = new XMLHttpRequest();
        var _params = "";
        if (params !== null) {
            var count = 0;
            var paramsLength = Object.keys(params).length;
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    _params += key + "=" + params[key];
                    if (count < paramsLength - 1) {
                        _params += "&";
                    }
                }
                count++;
            }
        }



        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = null;
                    var e = null;
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch (ex) {
                        e = ex;
                    }
                    onFinished(e, data);
                } else {
                    onFinished(xhr.status, null);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (typeof headers == "object") {
            for (var key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        xhr.send(_params);
    }

    static get(url: string, params: { [key: string]: string }, onFinished: (err: any, json: any) => void, headers: { [key: string]: string } = null) {
        var xhr = new XMLHttpRequest();
        var _params = "";
        params = params || {};
        params["pf"] = "web";
        if (params !== null) {
            var count = 0;
            var paramsLength = Object.keys(params).length;
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    _params += key + "=" + params[key];
                    if (count++ < paramsLength - 1) {
                        _params += "&";
                    }
                }
            }
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = null;
                    var e = null;
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch (ex) {
                        e = ex;
                    }
                    onFinished(e, data);
                } else {
                    onFinished(xhr.status, null);
                }
            }
        };
        xhr.open("GET", url + "?" + _params, true);
        if (typeof headers == "object") {
            for (var key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        xhr.send();
    }
}
