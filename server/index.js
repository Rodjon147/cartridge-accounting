require("dotenv").config()
const express = require("express")
const cors = require("cors")

const database = require("./database")

const cartridgeRoutes = require("./routes/cartridgeRoutes");

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/cartridges", cartridgeRoutes);

app.get("/", (req,res) => {
    res.json({ message: "Server is working"})
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})