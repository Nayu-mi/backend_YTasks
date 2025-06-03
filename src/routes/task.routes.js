const { Router } = require("express")
const { postTask, getTasks, deleteTask, patchTaskStatus, putTask } = require("../controllers/task.controllers")

const router = Router()

router.post("/", postTask)
router.get("/lista/:id", getTasks)
router.delete("/:id", deleteTask)
router.patch("/:id/concluir", patchTaskStatus)
router.put("/:id", putTask)

module.exports = router