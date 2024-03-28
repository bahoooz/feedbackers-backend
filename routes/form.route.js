const express = require("express")
const QCMForm = require("../controllers/form.controller.js")
const FreeForm = require("../controllers/form.controller.js")

const router = express.Router()

router.get("/form/qcm", QCMForm)

router.get("/form/free", FreeForm)
