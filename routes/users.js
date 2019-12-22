var express = require("express");
var router = express.Router();

//TODO, if this ds is here, then does it mean we change the saved box DOM here as well?
let savedUsers = {};

/* GET users listing. */
//TODO, do we need this route?
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

// Creating a resource (save button)
//TODO, should this be a post
router.post("/:user", (req, res) => {
  //TODO, should check validity of name and url
  //meaning make a fetch here?
  // or do we know its already valid from b4?
  const name = req.params.user;
  const url = req.body.github;

  console.log(savedUsers);
  console.log(`name : ${name}`);
  console.log(`url: ${url}`);

  if (savedUsers[name]) {
    //res code 409 is for conflict, the right one to return
    res.status(409).send(`User ${name} already exists!!`);
  } else {
    savedUsers[name] = url;
    res.status(200).send(`User ${name} added`);
  }
});

router.delete("/:user", (req, res) => {
  const name = req.params.user;
  const url = req.body.github;

  console.log(savedUsers);
  console.log(`name : ${name}`);
  console.log(`url: ${url}`);

  if (savedUsers[name]) {
    //existing.. delete him
    delete savedUsers[name];
    res.status(200).send(`User ${name} removed`);
  } else {
    //usr not saved, show error -> return code 404 thats the one we return for unfound resource
    res.status(404).send(`User ${name} not found`);
  }
});
module.exports = router;
