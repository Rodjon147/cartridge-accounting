const db = require("../database")

exports.getAllCartridges = (req, res) => {
    const sql = "SELECT * FROM cartridges"

    db.query(sql, (err, result) => {
        if(err) {
            return res.status(500).json(err)
        }

        res.json(result)
    })
}

exports.getCartridgeById = (req, res) => {
    const { id } = req.params

    const sql = "SELECT * FROM cartridges WHERE id = ?"

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        res.json(result[0])
    })
}

exports.createCartridge = (req, res) => {
    const {model, type, printer, qty, min_qty, refill_date, note} = req.body;

    const sql = "INSERT INTO cartridges(model, type, printer, qty, min_qty, refill_date, note)VALUES (?, ?, ?, ?, ?, ?, ?)"

    db.query(sql,[model, type, printer, qty, min_qty, refill_date, note], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }

            res.status(201).json({
                message: "Cartridge created",
                id: result.insertId
            })
        }
    )
}

exports.updateCartridge = (req, res) => {
    const { id } = req.params

    const {model, type, printer, qty, min_qty, refill_date, note} = req.body

    const sql = "UPDATE cartridges SET model = ?, type = ?, printer = ?, qty = ?, min_qty = ?, refill_date = ?, note = ? WHERE id = ?"

    db.query(sql, [model, type, printer, qty, min_qty, refill_date, note, id], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }

            res.json({
                message: "Cartridge updated"
            })
        }
    )
}


exports.deleteCartridge = (req, res) => {
    const { id } = req.params

    const sql = "DELETE FROM cartridges WHERE id = ?"

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        res.json({
            message: "Cartridge deleted"
        })
    })
}