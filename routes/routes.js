const express = require("express")
const router = express.Router()

router.post("/admin/:id/create-form", async (req, res) => {
    console.log("This is a test");
    res.status(200).send({message: "reussi"})
})

module.exports = router