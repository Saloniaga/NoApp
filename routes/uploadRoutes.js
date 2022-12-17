const express = require("express");
const router = express.Router();
const Upload = require("../models/upload");
const csv = require("csv-parser");
const fs = require("fs");
const results = [];

router.post("/upload", (req, res) => {
  //READING FROM POSTS.CSV
  fs.createReadStream("posts.csv")
    .pipe(csv({ separator: "\t" }))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);
      //ADDING IN THE DATABASE IN COLLECTION UPLOAD
      Upload.insertMany(results)
        .then(() => {
          res.json({ success: "success" });
        })
        .catch((err) => res.status(400).send("failure"));
    });
});
module.exports = router;
