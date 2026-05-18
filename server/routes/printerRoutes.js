const express = require("express")

const router = express.Router()

const {getAllPrinters, createPrinter, updatePrinter, deletePrinter} = require("../controllers/printerController")

router.get("/", getAllPrinters)
router.post("/", createPrinter)
router.put("/:id", updatePrinter)
router.delete("/:id", deletePrinter)

module.exports = router