const User = require('../model/user')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.status(422).json({
                error: true,
                status: 422,
                message: 'Username existing in system,but should be unique'
            })
        }


        const emailCheck = await User.findOne({ email })

        if (emailCheck) {
            return res.status(422).json({
                error: true,
                status: 422,
                message: 'Email existing in system,but should be unique'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashPassword,
        })
        delete user.password
        return res.status(200).json({
            error: false,
            status: 200,
            message: {
                username: user.username,
                email: user.email
            }
        })

    } catch (ex) {
        next(ex)
    }

}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const emailCheck = await User.findOne({ email: email })
        if (!emailCheck) {
            return res.status(422).json({
                error: true,
                status: 422,
                message: 'Email not existing in system, please enter email valid please'
            })
        }

        const validPassword = await bcrypt.compare(password, emailCheck.password)

        if (!validPassword) {
            return res.status(422).json({
                error: true,
                status: 422,
                message: 'Password is incorrect'
            })
        }

        return res.status(200).json({
            error: false,
            status: 200,
            message: {
                id: emailCheck._id,
                username: emailCheck.username,
                email: emailCheck.email,
                avatarImage: emailCheck.avatarImage,
                isAvatarImageSet: emailCheck.isAvatarImageSet
            }
        })

    } catch (ex) {
        next(ex)
    }

}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const { email, imgURL } = req.body;
        const emailCheck = await User.findOne({ email: email })

        if (!emailCheck) {
            return res.status(422).json({
                error: true,
                status: 422,
                message: 'Email not existing in system, please enter email valid please'
            })
        }

        const userUpdate = {
            avatarImage: imgURL,
            isAvatarImageSet: true,
        }

        const attUser = await User.findOneAndUpdate({ email: email }, userUpdate)

        return res.status(200).json({
            error: false,
            status: 200,
            message: {
                username: attUser.username,
                email: attUser.email,
                avatar: attUser.avatarImage,
                isAvatarImageSet: attUser.isAvatarImageSet
            }
        })

    } catch (ex) {
        next(ex)
    }

}

module.exports.setToken = async (req, res, next) => {
    try {
        const { email, tokenExpo } = req.body;
        console.log('====================================');
        console.log(req.body);
        console.log('====================================');
        const emailCheck = await User.findOne({ email: email })

        if (!emailCheck) {
            return res.status(422).json({
                error: true,
                status: 422,
                message: 'Email not existing in system, please enter email valid please'
            })
        }

        const userUpdate = {
            tokenExpo: tokenExpo,
        }

        const update = await User.findOneAndUpdate({ email: email }, userUpdate)
        console.log('====================================');
        console.log(tokenExpo);
        console.log('====================================');
        return res.status(200).json({ token: tokenExpo })

    } catch (e) {
        next(e)
    }
}

module.exports.getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await User.find({
            
            email: { $ne: req.params.email }
        })
            .select([
                "_id",
                "email",
                "username",
                "isAvatarImageSet",
                "avatarImage"
            ])

        return res.status(200).json({
            error: false,
            status: 200,
            message: allContacts
        })

    } catch (ex) {
        next(ex)
    }
}

module.exports.getTest = async (req, res, next) => {
    return res.status(200).json({
        error: false,
        status: 200,
        message: 'Teste'
    })
}