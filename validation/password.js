const errMessage = 'Length of password must be between 7 and 50 characters';

const test = (pass) => {
    if (typeof pass !== 'string' || pass.length < 7 || pass.length > 50) {
        return false;
    }
    return true;
};

module.exports.errMessage = errMessage;
module.exports.validator = test;
