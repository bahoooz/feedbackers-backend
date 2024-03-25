const express = require("express")
const router = express.Router()

router.post("/admin/:id/create-form", async (req, res) => {
    console.log("This is a test");
})

module.exports = router