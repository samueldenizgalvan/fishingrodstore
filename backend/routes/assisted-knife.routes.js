module.exports = app => {
    const assistedKnives = require("../controllers/assisted-knife.controller");
  
    var router = require("express").Router();
  
    router.post("/", assistedKnives.create);
  
    router.get("/", assistedKnives.findAll);
  
    router.get("/published", assistedKnives.findAllPublished);
  
    router.get("/:id", assistedKnives.findOne);
  
    router.put("/:id", assistedKnives.update);
  
    router.delete("/:id", assistedKnives.delete);
  
    router.delete("/", assistedKnives.deleteAll);
  
    app.use('/api/assisted-knives', router);

  };