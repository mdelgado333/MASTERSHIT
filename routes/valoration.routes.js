const router = require("express").Router()

const Message = require('../models/Message.model')
const Post = require('../models/Post.model')
const Short = require('../models/Short.model')
const User = require('../models/User.model')

const { isLoggedOut, isLoggedIn } = require('./../middleware/route-guard')



// MAKE MASTERPIECE

router.post('/:shortId/masterpiece', (req, res, next) => {

    const { shortId } = req.params

    Short
        .findByIdAndUpdate(shortId, { isMasterpiece: true, isBullshit: false })
        .then(() => res.redirect(`/shorts/details/${shortId}`))
        .catch(err => next(err))

})

// MAKE BULLSHIT

router.post('/:shortId/bullshit', (req, res, next) => {

    const { shortId } = req.params

    Short
        .findByIdAndUpdate(shortId, { isMasterpiece: false, isBullshit: true })
        .then(() => res.redirect(`/shorts/details/${shortId}`))
        .catch(err => next(err))

})

// LIKE A SHORT or A POST IN A SHORT

router.post('/shortlike/:userId/:shortId', isLoggedIn, (req, res, next) => {

    const { userId, shortId } = req.params

    User
        .findByIdAndUpdate(userId, { $inc: { likesCounter: 1 } }, { new: true })
        .then(user => {
            if (user.likesCounter >= 10 && user.role === 'USER') {
                User
                    .findByIdAndUpdate(userId, { role: "CREATOR" }, { new: true })
                    .then(next())
            } else {
                next()
            }
        })
        .then(() => res.redirect(`/shorts/details/${shortId}`))
        .catch(err => next(err))

})


// LIKE A POST IN A MOVIE

router.post('/movielike/:userId/:movieId', isLoggedIn, (req, res, next) => {

    const { userId, movieId } = req.params

    User
        .findByIdAndUpdate(userId, { $inc: { likesCounter: 1 } })
        .then(user => {
            if (user.likesCounter >= 10 && user.role === 'USER') {
                User
                    .findByIdAndUpdate(userId, { role: "CREATOR" }, { new: true })
                    .then(next())
            } else {
                next()
            }
        })
        .then(() => res.redirect(`/movies/details/${movieId}`))
        .catch(err => next(err))
})

module.exports = router