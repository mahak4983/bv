const errMessage = 'Adress cannot be empty';

const test = (pass) => {
    if (typeof pass !== 'string' || pass.length == 0 ) {
        return false;
    }
    return true;
};

module.exports.errMessage = errMessage;
module.exports.validator = test;
