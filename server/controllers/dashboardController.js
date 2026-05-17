const db = require("../database")

exports.getDashboardStats = (req, res) => {

    const stats = {}

    const totalCartridgesQuery = "SELECT COUNT(*) AS total FROM cartridges"
    const lowStockQuery = "SELECT COUNT(*) AS lowStock FROM cartridges WHERE qty <= min_qty"
    const totalPrintersQuery = "SELECT COUNT(*) AS totalPrinters FROM printers"


    db.query(totalCartridgesQuery, (err, totalResult) => {

        if (err) return res.status(500).json(err)
        stats.totalCartridges = totalResult[0].total

        db.query(lowStockQuery, (err, lowStockResult) => {

            if (err) return res.status(500).json(err)
            stats.lowStock = lowStockResult[0].lowStock

            db.query(totalPrintersQuery, (err, printerResult) => {

                if (err) return res.status(500).json(err);
                stats.totalPrinters =printerResult[0].totalPrinters
                res.json(stats)

            })

        })

    })

}