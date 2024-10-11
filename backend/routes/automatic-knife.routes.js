module.exports = app => {
    const automaticKnives = require("../controllers/automatic-knife.controller");
  
    var router = require("express").Router();
  
    router.post("/", automaticKnives.create);
  
    router.get("/", automaticKnives.findAll);
  
    router.get("/published", automaticKnives.findAllPublished);
  
    router.get("/:id", automaticKnives.findOne);
  
    router.put("/:id", automaticKnives.update);
  
    router.delete("/:id", automaticKnives.delete);
  
    router.delete("/", automaticKnives.deleteAll);
  
    app.use('/api/automatic-knives', router);
    
  };