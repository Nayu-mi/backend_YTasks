const { Router } = require("express")
const { postTask, getTasks, deleteTask, patchTaskStatus } = require("../controllers/task.controllers")

const router = Router()

router.post("/", postTask)
router.get("/lista/:id", getTasks)
router.delete("/:id", deleteTask)
router.patch("/:id/concluir", patchTaskStatus)

module.exports = router