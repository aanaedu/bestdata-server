exports.handleDuplicateKeyError = function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        var regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i,      
        match =  error.message.match(regex),  
        indexName = match[1] || match[2]; 
        next(new Error(`${indexName} already exists. Please try another one.`));
        console.log(error.toString())
    } else {
        next(error);
    }
};

exports.validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};