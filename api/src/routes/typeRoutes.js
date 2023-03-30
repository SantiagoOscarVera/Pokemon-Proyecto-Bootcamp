const { Router} = require("express");
const router = Router()
const {Type } = require("../db") 
const axios = require("axios")
const {Op} = require("sequelize")


router.get("/", async (req, res, next) => {
    try {
      let allTypes = await axios.get("https://pokeapi.co/api/v2/type"); 
      let todosTypes = allTypes.data.results; 

      todosTypes.forEach((item) => { 
        Type.findOrCreate({ 
          where: { 
            name: item.name,  
            },
        });
        });
      const typesDb = await Type.findAll(); 
      res.send(typesDb);  
    } catch (error) {
      return res.status(404).send("Error, no encuentra el type: " + error);
        //next(error);
    }
    });
    


module.exports = router;