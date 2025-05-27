const { Router } = require("express")
const { postList } = require("../controllers/taskList.controllers")

const router = Router()

router.post("/", postList)


module.exports = router