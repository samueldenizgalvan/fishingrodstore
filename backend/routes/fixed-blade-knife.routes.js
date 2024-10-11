module.exports = app => {
    const fixedBladeKnives = require("../controllers/automatic-knife.controller");
  
    var router = require("express").Router();
  
    router.post("/", fixedBladeKnives.create);
  
    router.get("/", fixedBladeKnives.findAll);
  
    router.get("/published", fixedBladeKnives.findAllPublished);
  
    router.get("/:id", fixedBladeKnives.findOne);
  
    router.put("/:id", fixedBladeKnives.update);
  
    router.delete("/:id", fixedBladeKnives.delete);
  
    router.delete("/", fixedBladeKnives.deleteAll);
  
    app.use('/api/fixed-blade-knives', router);
    
  };