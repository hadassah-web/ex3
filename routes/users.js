var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

// Creating a resource
router.get("/:user", (req, res) => {
  const name = req.params.user;
  const url = req.body.github;

  console.log(name);
  console.log(url);
  res.status(200);
});
module.exports = router;
