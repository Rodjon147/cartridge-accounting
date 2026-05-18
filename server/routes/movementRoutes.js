const express = require("express")

const router = express.Router()

const { getAllMovements, deleteMovement } = require("../controllers/movementController")

router.get("/", getAllMovements)

router.delete("/:id", deleteMovement)

module.exports = router
