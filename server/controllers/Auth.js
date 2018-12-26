import jwt from 'jsonwebtoken'

import config from '../../config/db'
import UserModel from '../models/UserModel'

class AuthController {
    signUp(req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({ success: false, msg: 'Please pass username and password.' })
        } else {
            const {username, password} = req.body
            const newUser = new UserModel({username, password})

            newUser.save((err) => {
                if (err)
                    return res.json({ success: false, msg: 'Username already exists.' })

                res.json({ success: true, msg: 'Successful created new user.' })
            });
        }
    }

    signIn(req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({ success: false, msg: 'Please pass username and password.' })
        }

        const { username, password } = req.body

        UserModel.findOne({ username }, (err, user) => {
            if (err)
                throw err

            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    if (isMatch && !err) {
                        const token = jwt.sign(user.toJSON(), config.secret,{ expiresIn: '30m' });
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }
        });
    }
}

export default new AuthController()
