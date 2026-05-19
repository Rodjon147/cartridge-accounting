const db = require("../database")

exports.getAllMovements = (req, res) => {
  const sql =
    "SELECT movements.*, cartridges.model AS cartridge_model FROM movements JOIN cartridges ON movements.cartridge_id = cartridges.id ORDER BY movement_date DESC"

  db.query(sql, (err, result) => {
    if (err) res.status(500).json(err)
    res.json(result)
  })
}

exports.createMovement = (req, res) => {
  const { cartridge_id, action_type, to_location, quantity, comment } = req.body

  const sql = "INSERT INTO movements (cartridge_id,action_type,to_location,quantity,comment) VALUES (?, ?, ?, ?, ?)"

  db.query(sql, [cartridge_id, action_type, to_location, quantity, comment], (err, result) => {
    if (err) res.status(500).json(err)

    res.status(201).json({
      message: "Movement created",
    })
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
