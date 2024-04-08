const express = require("express");
const router = express.Router();

//pdf Generate
const pdf = require("html-pdf");
const pdfTemplate = require("../PdfFile/index");

// const options = {
//   format: "A4",
//   width: "9.5in",
//   height: "16.5in",
//   // border: {
//   //   top: "1cm", // default is 0, units: mm, cm, in, px
//   //   right: "1cm",
//   //   bottom: "2cm",
//   //   left: "1cm",
//   // },
// };

const options = {
  format: "A4",
  width: "5in",
  height: "9in",
  border: {
    top: "1cm", // default is 0, units: mm, cm, in, px
    right: "0cm",
    bottom: "5cm",
    left: "0cm",
  },
};

router.post("/create-pdf", (req, res) => {
  pdf
    .create(pdfTemplate(req.body), options)
    .toFile("routes/result.pdf", (err) => {
      if (err) {
        res.send(Promise.reject());
        console.log(err);
      }
      // SalesController.helloWorld(req, res)
      res.send(Promise.resolve());
    });
});

router.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

module.exports = router;
