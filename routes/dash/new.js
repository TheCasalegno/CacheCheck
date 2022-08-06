const express = require("express")
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv')
const urldb = ``

router.post("/", (req, res) => {
    MongoClient.connect(urldb, function (err, db) {
        const dbID = db.db("cachecheck")

        if (err) throw err
        dbID.collection("pages").insertOne({ title: req.body.title, gcode: req.body.gcode, solution: req.body.solution, message: req.body.message, yes: "0", no: "0"})
        if (err) throw err
        res.render("pages/new/confirmed")
    })
})

router.get("/", (req, res) => {
    res.render("pages/new/page")
})

module.exports  = router