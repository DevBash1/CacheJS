//When you think about it,
//Nobody is a nobody.
//Everybody is someone to somebody.

function cache() {
    let xhr;
    let success = false;
    let error = false;
    let cacheID = Math.floor(Math.random() * 10000000);

    this.store = function(url,key=null) {
        if(key != null){
            cacheID = key;
        }
        if(typeof cacheID != "number"){
            throw("Cache Key must be of type number");
        }
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhr = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onload = function() {
            if (xhr.status == 200) {
                let reader = new FileReader();
                reader.onloadend = function() {
                    try {
                        localStorage.setItem("CacheJS_" + cacheID, reader.result);
                        if (success) {
                            success(cacheID);
                        }
                    } catch (e) {
                        if (error) {
                            error(e);
                        }
                    }
                }
                reader.readAsDataURL(xhr.response);
            } else {
                if (error) {
                    error("Error loading file");
                }
            }
        }
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    this.onSuccess = function(callback) {
        success = callback;
    }
    this.onError = function(callback) {
        error = callback;
    }
    this.get = function(key) {
        return localStorage.getItem("CacheJS_" + key);
    }
    this.remove = function(key) {
        localStorage.removeItem("CacheJS_" + key);
    }
    this.getAllKeys = function() {
        let items = Object.keys(localStorage);
        let keys = [];
        items.forEach(function(item) {
            if (item.startsWith("CacheJS_")) {
                keys.push(item.substring(8));
            }
        })
        return keys;
    }
    this.removeAllKeys = function() {
        let items = Object.keys(localStorage);
        let len = 0;
        items.forEach(function(item) {
            if (item.startsWith("CacheJS_")) {
                localStorage.removeItem(item);
                len++;
            }
        })
        return len;
    }
}
