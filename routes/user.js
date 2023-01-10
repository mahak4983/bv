const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const passwordValidator = require('../validation/password');
const emailIdValidator = require('../validation/email');

const SALT_ROUNDS = 12; 
const JWT_SECRET  = process.env.JWT_SECRET

/**
 * @route /user/register
 *
 * @access public
 *
 * @description Register a user with the given details
 * *
 * @body The request body should be a json object as defined in the `user schema
 *
 * @returns
 *  200: a json object with a 'message' field
 *  400:
 *    a parameter is incorrect/absent or userId is taken
 *    --> a json object with key = <NAME OF FIELD> and value = <ERROR>
 *  500: internal server error --> A json object with 'message' field
 */
router.post('/register', async (req, res) => {
    const {
        email, name, password, address
    } = req.body;
    //console.log("hello")
    try {
        // check the password field before hashing
        if (!passwordValidator.validator(password)) {
            res.status(400).send({
                message: 'Incorrect parameters',
                password: passwordValidator.errMessage,
            });
            return;
        }

        // hash the user's password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const userData = {
            name,
            email,
            password: hashedPassword,
            address
        };

       

        const newUser = new User(userData);
        // validate the parameters
        const validationErrors = newUser.validateSync();

        if (validationErrors !== undefined) {
            const err = {
                message: 'Incorrect parameters!',
            };
            Object.keys(validationErrors.errors).forEach((key) => {
                err[key] = validationErrors.errors[key].message;
            });
            res.status(400).send(err);
            return;
        }

        // put the user's data in the database
        await newUser.save();

        res.send({ message: 'Successfully registered. Kindly login!' });
    } catch (e) {
        if (e.name === 'MongoError' && e.code === 11000) {
            // duplicate key error
            res.status(400).send({ userId: 'Username unavailable' });
            return;
        }
        res.status(500).send({ message: 'Internal server error!' });
    }
});

/**
 * @route /user/login
 *
 * @access public
 *
 * @description Login a user with the given credentials
 *
 * @body The request body should be a json object containing {uid (username/email), password}
 *
 * @returns
 *  200: a json object with a 'message' field
 *  400:
 *    a parameter is incorrect/absent
 *      --> a json object with key = <NAME OF FIELD> and value = <ERROR>
 *  401: Wrong credentials
 *  404: User not found
 *  500: internal server error --> A json object with 'message' field
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate the parameters
    const err = {};
    if (!emailIdValidator.validator(email)) {
        err.email = 'Invalid email';
    }
    if (!passwordValidator.validator(password)) {
        err.password = passwordValidator.errMessage;
    }
    if (Object.keys(err).length !== 0) {
        // there are some errors while validating the parameters
        return res.status(400).send(err);
    }
    //console.log(email);
    //console.log(password);

    try {
        // Get the user
        const userInfo = await User.findOne(
            { $or: [{ email: email }] },
            {
                password: 1, name: 1, email: 1, address:1
            },
        );
        if (userInfo === null) {
            // user is not registered
            return res.status(404).send({
                message: 'User not registered',
            });
        }
        console.log(userInfo);

        // Check if correct password was entered
        const validatePassword = await bcrypt.compare(password, userInfo.password);
        if (validatePassword === false) {
            return res.status(401).send({
                message: 'Incorrect password!',
            });
        }
       // console.log(validatePassword);
        // remove the password
        delete userInfo.password;

        // Sign the jwt and send back to the user
        const signedToken = await jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                data: userInfo,
            },
            JWT_SECRET,
        );
        res.header('x-auth-token', signedToken);
        return res.send({ message: 'Login successful', userInfo });
    } catch (e) {
        return res.status(500).send({ message: 'Internal server error!' });
    }
});

module.exports = router;