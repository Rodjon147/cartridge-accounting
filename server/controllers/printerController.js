const db = require("../database")

exports.getAllPrinters = (req, res) => {

    const sql = "SELECT * FROM printers"

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err)
        res.json(result)

    })

}

exports.createPrinter = (req, res) => {

    const {name, model, department, cartridge, status} = req.body

    const sql = "INSERT INTO printers(name, model, department, cartridge, status)VALUES (?, ?, ?, ?, ?)"

    db.query(
        sql, [name, model, department, cartridge, status], (err, result) => {

            if (err) return res.status(500).json(err)

            res.status(201).json({
                message: "Printer created"
            })

        }
    )

}

exports.updatePrinter = (req, res) => {

    const { id } = req.params

    const {name, model, department, cartridge, status} = req.body

    const sql = "UPDATE printers SET name = ?, model = ?, department = ?, cartridge = ?, status = ? WHERE id = ?"

    db.query(sql, [name,model,department,cartridge,status,id], (err, result) => {

            if (err) return res.status(500).json(err)

            res.json({
                message: "Printer updated"
            })

        }
    )

}

exports.deletePrinter = (req, res) => {

    const { id } = req.params

    const sql = "DELETE FROM printers WHERE id = ?"

    db.query(sql, [id], (err, result) => {

        if (err) res.status(500).json(err)

        res.json({
            message: "Printer deleted"
        })

    })

}