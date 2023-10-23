const User = require("../database/model/user.model")
const jwt = require("jsonwebtoken")
const vailidator = require('email-validator');
const { match } = require("assert");

const register = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;

    try {

        if (!username || !email) {
            return res.status(400).send("All fields are required")
        }
        if (!password || password.length < 6) {
            return res.status(400).send("Enter valid password")
        }
        if (!vailidator.validate(email)) {
            return res.status(400).send("Please enter valid email")
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).send("Email is already taken")
        }

        const user = new User({
            email, username, password
        })

        await user.save()
        return res.status(200).send(user)


    } catch (err) {
        return res.status(400).send(err.message)

    }
}

const signin = async (req, res) => {

    try {
        let { email, password } = req.body
        if (!email || !password || password.length < 6) {
            return res.status(400).send("Please enter vaild credentials")
        }

        const user = await User.findOne({ email })
        await user.comparePassword(password, (err, match) => {
            if (!match || err) {
                return res.status(400).send("Password does not match")
            }

            let token = jwt.sign({ _id: user._id },
                'sdfdfsdfds',
                { expiresIn: '24h' }

            )
            res.status(200).send({
                token,
                _id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            })

        })
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}

module.exports = {
    signin,
    register
}