import express from 'express'

const landingRouter = express.Router()

landingRouter.get('/', (req, res) => {
    res.render('index')
})

export default landingRouter