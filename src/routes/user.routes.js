const { Router } = require("express")
const {postUser} = require("../controllers/user.controllers")

const router = Router()

router.post('/', postUser)


module.exports = router