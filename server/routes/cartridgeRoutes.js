const express = require("express")
const router = express.Router()

const {
  getAllCartridges,
  getCartridgeById,
  createCartridge,
  updateCartridge,
  deleteCartridge,
} = require("../controllers/cartridgeController")

router.get("/", getAllCartridges)
router.get("/:id", getCartridgeById)
router.post("/", createCartridge)
router.put("/:id", updateCartridge)
router.delete("/:id", deleteCartridge)

module.exports = router
