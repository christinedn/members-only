const User = require('../models/user')
// for password/email validation
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const passport = require("passport");
const keys = require('../config/keys')


const sign_up_get = (req, res) => {
    res.render('sign-up', {title: 'Sign up'})
}

const sign_up_validation = [
    // validating password
//     body('passwordConfirmation').custom((value, { req, res }) => {
//         console.log(`this is the value: ${value}, ths is the req.body.password: ${req.body.password}`)
//         if (value !== req.body.password) {
//             return Promise.reject('Passwords do not match');
//         } else {
//             return true;
//         }
//     }),
    
//     // validating username
//     body('username').custom(async (value, { res }) => {
//         const existingUsername = await User.findOne({ username: value });
//         if (existingUsername) {
//             console.log("sending back existing username error")
//             return Promise.reject('Username already exists');
//         } else {
//             return true;
//         }
//     }),
];

const sign_up_post = [
    // validating password
    body('passwordConfirmation').custom((value, { req }) => {
        console.log(`this is the value: ${value}, this is the req.body.password: ${req.body.password}`)
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        } else {
            return true;
        }
    }),

    // validating username
    body('username').custom(async (value) => {
        const existingUsername = await User.findOne({ username: value });
        if (existingUsername) {
            throw new Error('Username already exists');
        } else {
            return true;
        }
    }),

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPassword,
            })

            // use await to only redirect when user is saved
            await user.save()
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
];

const log_in_get = (req, res) => {
    res.render('log-in', { title: 'Log in'})
}

const log_in_post = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ success: true });
        });
    })(req, res, next);
}

const log_out_get = (req, res) => {
    req.logout((err) => {
        if (err) {
        return next(err);
        }
        res.redirect("/");
    });
}

const profile_get = (req, res) => {
    res.render('profile', ({ title: 'Profile'}))
}

const member_admin_get = (req, res) => {
    res.render('member-admin', ({ title: 'Become Member or admin'}))
}

const member_secret_password_check = async (req, res) => {
    const enteredPassword = req.body.password
    console.log(`this is the pw entered: ${enteredPassword}`)
    const correctPassword = keys.sitepasswords.memberpassword

    if (enteredPassword === correctPassword) {
        try {
        console.log("the password is correct")
        req.user.isMember = true
        await req.user.save();
        // send message to client
        res.json({ message: 'You are now a member'})
        } catch (error) {
        console.log(error)
        }
    } else {
        res.status(401).json({ error: 'Incorrect password. Try again.' });
    }
}

const admin_secret_password_check = async (req, res) => {
    const enteredPassword = req.body.password
    const correctPassword = keys.sitepasswords.adminpassword
  
    if (enteredPassword === correctPassword) {
      try {
        console.log("the password is correct")
        req.user.isAdmin = true
        await req.user.save();
        // send message to client
        res.json({ message: 'You are now an admin'})
      } catch (error) {
        console.log(error)
      }
    } else {
      res.status(401).json({ error: 'Incorrect password. Try again.' });
    }
}

module.exports = {
    sign_up_validation,
    sign_up_get,
    sign_up_post,
    log_in_get,
    log_in_post,
    log_out_get,
    profile_get,
    member_admin_get,
    member_secret_password_check,
    admin_secret_password_check,
}

