const pdf = require("html-pdf");
const pdfTemplate = require("../PdfFile/index");

exports.create_invoice = (req, res, next) => {
    const options = {
        format: "A4",
        width: "11in",
        height: "17in",
        border: {
          top: "2cm", // default is 0, units: mm, cm, in, px
          right: "1cm",
          bottom: "3cm",
          left: "1cm",
        },
      };
    pdf.create(pdfTemplate(req.body), options).toFile("controllers/result.pdf", (err) => {
      if (err) {
        res.send(Promise.reject());
        console.log(err);
      }
      res.send(Promise.resolve());
    });
}

exports.fetch_invoice = (req, res, next) => {
    res.sendFile(`${__dirname}/result.pdf`);
}

