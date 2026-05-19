const express = require("express")

const router = express.Router()

const { getAllMovements, createMovement, deleteMovement } = require("../controllers/movementController")

router.get("/", getAllMovements)
router.post("/", createMovement)
router.delete("/:id", deleteMovement)

module.exports = router
