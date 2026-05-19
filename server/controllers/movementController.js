const db = require("../database")

exports.getAllMovements = (req, res) => {
  const sql = "SELECT movements.*, cartridges.model AS cartridge_model FROM movements JOIN cartridges ON movements.cartridge_id = cartridges.id ORDER BY movement_date DESC"

  db.query(sql, (err, result) => {
    if (err) res.status(500).json(err)
    res.json(result)
  })
}

exports.deleteMovement = (req, res) => {
  const { id } = req.params

  const sql = "DELETE FROM movements WHERE id = ?"

  db.query(sql, [id], (err, result) => {
    if (err) res.status(500).json(err)

    res.json({
      message: "Movement deleted",
    })
  })
}
