const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const urldb = ``;
const showdown = require("showdown");
const converter = new showdown.Converter();

router.get("/", (req, res) => {
  res.sendStatus("404");
});

router.post("/check/:id", (req, res) => {
  MongoClient.connect(urldb, function (err, db) {
    const dbID = db.db("cachecheck");

    if (err) throw err;
    dbID
      .collection("pages")
      .insertOne({
        title: req.body.title,
        gcode: req.body.gcode,
        solution: req.body.solution,
        message: req.body.message,
        yes: "0",
        no: "0",
      });
    if (err) throw err;
    res.render("pages/new/confirmed");
  });
});

router.get("/:id", (req, res) => {
  MongoClient.connect(urldb, function (err, db) {
    const dbID = db.db("cachecheck");

    if (err) throw err;
    dbID
      .collection("pages")
      .find({ gcode: req.params.id })
      .toArray((err, result) => {
        if (err) throw err;
        if (result == "") {
          res.sendStatus("404");
        } else {
          let title = result[0].title;
          let gcode = result[0].gcode;
          let solution = result[0].solution;
          let message = converter.makeHtml(result[0].message);
          let yes = result[0].yes;
          let no = result[0].no;
          if (req.query.try == undefined ) {
            res.render("pages/cache/page", {
              title,
              gcode,
              solution,
              message,
              yes,
              no,
            });
          } else if (req.query.try == solution) {
            res.render("pages/cache/correct", {
              title,
              gcode,
              solution,
              message,
              yes,
              no,
            });
          } else {
            res.render("pages/cache/incorrect", {
              title,
              gcode,
              solution,
              message,
              yes,
              no,
            });
          }
        }
      });
  });
});

module.exports = router;
