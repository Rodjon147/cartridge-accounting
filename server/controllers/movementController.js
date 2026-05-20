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

  const movementSql = "INSERT INTO movements(cartridge_id,action_type,to_location,quantity,comment) VALUES (?, ?, ?, ?, ?)"

  db.query(movementSql, [cartridge_id, action_type, to_location, quantity, comment], (err, result) => {
    if (err) res.status(500).json(err)

    let qtyChange = 0

    if (action_type === "Выдача" || action_type === "Списание") {
      qtyChange = -quantity
    }

    if (action_type === "Поступление" || action_type === "Заправка") {
      qtyChange = +quantity
    }
    const checkQtySql = "SELECT qty FROM cartridges WHERE id = ?"
    
    db.query(checkQtySql, [cartridge_id], (err, qtyResult) => {
      if (err) return res.status(500).json(err)

      const currentQty = qtyResult[0].qty
      const newQty = currentQty + qtyChange

      if (newQty < 0) return res.status(400).json({message: "Недостаточно картриджей на складе"})

      const updateQtySql = "UPDATE cartridges SET qty = qty + ? WHERE id = ?"
      db.query(updateQtySql, [qtyChange, cartridge_id], (err, updateResult) => {
        if (err) res.status(500).json(err)

        res.status(201).json({message: "Movement created and stock updated"})
      })
    })
  })
}

exports.deleteMovement = (req, res) => {
  const { id } = req.params

  const getMovementSql = "SELECT * FROM movements WHERE id = ?"

  db.query(getMovementSql,[id], (err, movementResult) => {
    if (err) return res.status(500).json(err)
    
    if (movementResult.length === 0) return res.status(404).json({message: "Movement not found"})
    
    const movement = movementResult[0]
    let qtyRollback = 0

    if (movement.action_type === "Выдача" || movement.action_type === "Списание"){
      qtyRollback = +movement.quantity
    }

    if (movement.action_type === "Поступление" || movement.action_type === "Заправка") {
      qtyRollback = -movement.quantity
    }

    const rollbackSql = "UPDATE cartridges SET qty = qty + ? WHERE id = ?"

    db.query(rollbackSql, [qtyRollback, movement.cartridge_id], (err, rollbackResult) => {
      if (err) return res.status(500).json(err)
        const deleteSql = "DELETE FROM movements WHERE id = ?"
        db.query(deleteSql, [id], (err, result) => {
          if (err) res.status(500).json(err)
          res.json({ message: "Movement deleted" })
        })
    })
    
  })
  

  
}
