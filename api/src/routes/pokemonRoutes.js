const { Router} = require("express");
const router = Router()
const { Pokemon, Type, Tipo } = require("../db") 
const axios = require("axios")
const {Op} = require("sequelize")
const cors = require("cors")

router.use(cors({
  origin: "https://pokemon-proyecto-bootcamp.vercel.app/"
}));
//OBTENER TODOS LOS POKEMON EN RUTA '/' O POR QUERY


router.get("/", async (req, res, next) => {
  let name = req.query.name;
  if (name) {
    name = name.toLowerCase(); 

    //OBTENER POKEMON DE API POR QUERY
    try {
      let apiarray1 = []; 
      const nameApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}` 
      );
      if (nameApi.data) { 
        apiarray1.push({
          id: nameApi.data.id,
          name: nameApi.data.name.toUpperCase(),
          hp: nameApi.data.stats[0].base_stat,
          attack: nameApi.data.stats[1].base_stat,
          defense: nameApi.data.stats[2].base_stat,
          speed: nameApi.data.stats[5].base_stat,
          height: nameApi.data.height,
          weight: nameApi.data.weight,
          image:
            nameApi.data.sprites.versions["generation-v"]["black-white"] 
              .animated.front_default,
          type: nameApi.data.types.map((t) => { 
            return { name: t.type.name };
          }),
        });
      }
      res.status(200).send(apiarray1); 
    } 
    catch {}

    // POMEMON DE BASE DE DATOS POR QUERY {name}
    try {
      let findName = await Pokemon.findAll({  
        include: {
          model: Type,
          attributes: ["name"], 
          through: { 
            attributes: [], 
          },
        },
        where: { 
          name: {
            [Op.iLike]: "%" + name + "%",  
          },
        },
        order: [["name", "ASC"]], 
      });

      // DATA QUE QUEREMOS DE CADA POKEMON
      let normalizePokemonDb = []; 
      normalizePokemonDb.push({
        id: findName[0]?.dataValues.id, 
        name: findName[0]?.dataValues.name.toUpperCase(), 
        hp: findName[0]?.dataValues.hp,
        attack: findName[0]?.dataValues.attack,
        defense: findName[0]?.dataValues.defense,
        speed: findName[0]?.dataValues.speed,
        height: findName[0]?.dataValues.height,
        weight: findName[0]?.dataValues.weight,
        image: findName[0]?.dataValues.image,
        type: findName[0]?.dataValues.types.map((n) => {  
          return { name: n.name };
        }),
        description: findName[0]?.dataValues.description, 
        createInDb: findName[0]?.dataValues.createInDb, 
      });
      res.status(200).send(normalizePokemonDb); 
    } catch {}

    // POKEMONES DE BASE DE DATOS
  } else {
    try {
      const include = await Pokemon.findAll({ 
        include: {
          model: Type, 
          attributes: ["name"], 
          through: {
            attributes: [], 
          },
        },
      });

      //DATA QUE QUEREMOS DE CADA POKEMON DE BASE DE DATOS
      let normalize = [];
      for (var i = 0; i < include.length; i++) { 
        normalize.push({
          id: include[i].dataValues.id,
          name: include[i].dataValues.name.toUpperCase(), 
          hp: include[i].dataValues.hp,
          attack: include[i].dataValues.attack,
          defense: include[i].dataValues.defense,
          speed: include[i].dataValues.speed,
          height: include[i].dataValues.height,
          weight: include[i].dataValues.weight,
          image: include[i].dataValues.image,
          type: include[i].dataValues.types.map((n) => { 
            return { name: n.name };
          }),
          description: include[i].dataValues.description, 
          createInDb: include[i].dataValues.createInDb,  
        });
      }

      //OBTENER TODOS LOS POKEMONES DE LA API

      let apiPokemon = await axios.get(                 
        "https://pokeapi.co/api/v2/pokemon?limit=40"
      ); 
      apiPokemon = apiPokemon.data.results;   
        let subrequest = apiPokemon.map((el) => axios.get(el.url)); 
        let promisePokemon = await Promise.all(subrequest);

        promisePokemon = await promisePokemon.map((poke) => { 
        return { 
          id: poke.data.id,
          name: poke.data.name.toUpperCase(), 
          hp: poke.data.stats[0].base_stat,
          attack: poke.data.stats[1].base_stat,
          defense: poke.data.stats[2].base_stat,
          speed: poke.data.stats[5].base_stat,
          height: poke.data.height,
          weight: poke.data.weight,
          image:
            poke.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
          type: poke.data.types.map((t) => {
            return { name: t.type.name };
          }),
        };
      });

    let allPokemones = [...normalize, ...promisePokemon]; 
      res.status(200).send(allPokemones); 
    } catch (error) { 
      return res.status(404).send({ msg: "Sorry, pokemon not found " + error });
    }
  }
});

//OBTENER POKEMONS POR PARAMS {ID}

//OBTENER POKEMON DE API POR PARAMS {ID}
router.get("/:id", async (req, res, next) => { 
  let id = req.params.id; 
  if (id.length < 5) { 
    try {
      let arrayApiId = []; 
      let idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); 
      idApi = idApi.data; 
      let subrequest2 = await axios.get(idApi.species.url); 
      if (idApi) { 
        arrayApiId.push({ 
          id: idApi.id,
          name: idApi.name.toUpperCase(),
          description: subrequest2.data.flavor_text_entries[8].flavor_text,    
          hp: idApi.stats[0].base_stat,
          attack: idApi.stats[1].base_stat,
          defense: idApi.stats[2].base_stat,
          speed: idApi.stats[5].base_stat,
          height: idApi.height,
          weight: idApi.weight,
          image: idApi.sprites.other.dream_world.front_default, 
          type: idApi.types.map((t) => { 
            return { name: t.type.name };
          }),
        });
      }
      res.status(200).send(arrayApiId); 
    } catch {}

    //OBTENER POMEMON DE BASE DE DATOS POR PARAMS {ID}
  } else { 
    try {
      let idParams = await Pokemon.findOne({ 
        where: { id: id }, 
        include: {
          model: Type, 
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      }
  );

      let normalizePokemonIdDb = []; 
      normalizePokemonIdDb.push({ 
        id: idParams?.dataValues.id,
        name: idParams?.dataValues.name.toUpperCase(),
        hp: idParams?.dataValues.hp,
        attack: idParams?.dataValues.attack,
        defense: idParams?.dataValues.defense,
        speed: idParams?.dataValues.speed,
        height: idParams?.dataValues.height,
        weight: idParams?.dataValues.weight,
        image: idParams?.dataValues.image,
          //"https://forums.pokemmo.com/uploads/monthly_2022_12/image.gif.f300cfe516ac948b8b5da516633a43bf.gif", /// link para hacer prueba de imagen
        type: idParams?.dataValues.types, 
        description: idParams?.dataValues.description, 
      });
      res.status(200).send(normalizePokemonIdDb); 
    } catch (error) {
      return res.status(404).send("Error, no encuentra el id: " + error);
    }
  }
});

//CREAR UN POKEMON en bd



router.post("/", async (req, res, next) => {
  try {
    const { name, hp, attack, defense,  speed,  height, weight, image, type, description, } = req.body; 
  
    let cratedPokemon = await Pokemon.create({  name,   hp, attack, defense,  speed,  height, weight, image,  description,}); 
    
    let typeFind = await Type.findAll({ 
      where: { name: type },
    });

    cratedPokemon.addType(typeFind); 
    res.status(201).send(cratedPokemon); 
  } catch (error) {
  
    return res.status(400).send("Sorry, couldnt create the pokemon:" + error);
  }
});






  



  module.exports = router;